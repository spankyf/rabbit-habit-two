const catchAsync = require("../utils/catchAsync");
const customQueries = require("../utils/customQueries");
const promiseAllProps = require("../utils/promiseAll");
const formatOverview = require("../utils/formatOverview");

exports.getGoals = catchAsync(async (req, res, next) => {
  const goalsArr = customQueries();

  promiseAllProps(goalsArr).then((values) => {
    console.log("Hit the views middleware");
    req.app.locals.data = formatOverview(values);

    next();
  });
});

exports.getOverview = catchAsync(async (req, res) => {
  res.status(200).render("pages/overview", {
    title: "All Habits",
  });
});
