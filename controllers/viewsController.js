const catchAsync = require("../utils/catchAsync");
const customQueries = require("../utils/customQueries");
const promiseAllProps = require("../utils/promiseAll");
const formatOverview = require("../utils/formatOverview");
// const compareGoals = require("../utils/compareGoals");

// exports.generateData = catchAsync(async(req, res, next) => {

// })

exports.getOverview = catchAsync(async (req, res) => {
  const goalsArr = customQueries();

  promiseAllProps(goalsArr).then((values) => {
    const overviews = formatOverview(values);
    res.status(200).render("pages/overview", {
      title: "All Habits",
      something: "Welecom",
      data: overviews,
    });
  });
});
