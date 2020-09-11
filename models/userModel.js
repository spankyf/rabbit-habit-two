"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,

        // primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,

        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      photo: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 255],
            msg: "String length is not in this range",
          },
        },
      },
      passwordConfirm: {
        type: DataTypes.STRING,
        validate: {
          function(pass) {
            if (pass != this.password) {
              throw new Error("The passwords do nnot match");
            }
          },
        },
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      passwordChangedAt: { type: DataTypes.DATE },
      passwordResetToken: { type: DataTypes.STRING },
      passwordResetTokenExpires: { type: DataTypes.DATE },
      active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },

    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async function (user) {
          user.email = user.email.toLowerCase();
          user.password = await bcrypt.hash(user.password, 12);
          user.passwordConfirm = undefined;
          return user;
        },
      },
    }
  );

  User.prototype.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

  User.prototype.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
      console.log(changedTimestamp, JWTTimestamp);
      return JWTTimestamp < changedTimestamp;
    }
    return false;
  };

  User.prototype.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
    this.save();
    return resetToken;
  };

  return User;
};
