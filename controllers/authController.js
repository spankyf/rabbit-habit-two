const db = require("../models");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const sendEmail = require("../utils/email");

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await db.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser.id);
  newUser.password = undefined;
  res.status(201).json({
    status: "success",
    token,
    user: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1 check if email and pass exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  // 2 check if user exists and right pass
  const user = await db.User.findOne({
    where: { email: email },
    attributes: { include: ["password"] },
  });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3 if all good seend token to client
  createSendToken(user, 200, req, res);
  // const token = signToken(user.id);
  // res.status(200).json({
  //   status: "success",
  //   token,
  // });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const user = await db.User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return next(new AppError("There is no user with that email address", 404));
  }
  const resetToken = user.createPasswordResetToken();

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot password? Submit a PATCH request with new password and passwordConfrim to ${resetURL}. If you did not forget your password, disregard!`;
  console.log({
    email: user.email,
    subject: "Your password reset token for 10 mniutes",
    message: message,
  });
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token for 10 mniutes",
      message,
    });
    res.status(200).json({ status: "success", message: "token send to email" });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save();

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in!", 401));
  }
  // console.log(token);

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = await db.User.findByPk(decoded.id);
  if (!freshUser) {
    return next(new AppError("The user with this token no longer exists", 401));
  }
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password. Please login again.", 401)
    );
  }
  req.user = freshUser;
  next();
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await db.User.findOne({
    where: {
      passwordResetToken: hashedToken,
      passwordResetTokenExpires: { [db.Sequelize.Op.gte]: Date.now() },
    },
  });
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = null;
  user.passwordResetTokenExpires = null;
  await user.save();

  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await db.User.findByPk(req.user.id);
  if (!user.correctPassword(req.body.passwordCurrent, user.password)) {
    return new AppError(
      "Your current password is wrong. Try again to enter it. ",
      401
    );
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createSendToken(user, 200, res);
});
