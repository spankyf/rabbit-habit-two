const db = require("../models/index");
const catchAsync = require("../utils/catchAsync");
const customQueries = require("../utils/customQueries");
const moment = require("moment");
const goals = require("../utils/data/goals.json");
const promiseAllProps = require("../utils/promiseAll");

exports.getOverview = catchAsync(async (req, res) => {
  const goalsArr = customQueries();

  promiseAllProps(goalsArr).then((values) => {
    values.forEach((el) => (el.href = `/${el.modelName.toLowerCase()}`));
    res.status(200).render("pages/overview", {
      title: "All Habits",
      something: "Welecom",
      data: values,
    });
  });
});
