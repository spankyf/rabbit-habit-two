const db = require("../models/index");
const catchAsync = require("../utils/catchAsync");
const sleepDuration = require("../utils/sleepDuration");
const moment = require("moment");
const goals = require("../utils/data/goals.json");
const promiseAllProps = require("../utils/promiseAll");

exports.getOverview = catchAsync(async (req, res) => {
  // let sleepTtl = [];

  // const sleeps = await db.Sleep.findAll({
  //   attributes: ["pee", "waketime", "sleeptime", "interruptions"],
  //   raw: true,
  // }).then((vals) => vals.forEach((el) => sleepTtl.push(sleepDuration(el))));

  //  if item.goalMetric = custom, use custom function to get info
  goals.forEach(function (item, i) {
    item.dbQuery = db[item.modelName].findAll({
      attributes: [
        [
          db.sequelize.fn(item.goalMetric, db.sequelize.col(item.targetColumn)),
          "goalResult",
        ],
      ],
      raw: true,
    });
  });

  promiseAllProps(goals).then((values) => {
    res.status(200).render("pages/overview", {
      title: "All Habits",
      something: "Welecom",
      data: values,
    });
  });
});
