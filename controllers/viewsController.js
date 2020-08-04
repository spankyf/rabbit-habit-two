const db = require("../models/index");
const catchAsync = require("../utils/catchAsync");
const moment = require("moment");
const goals = require("../utils/data/goals.json");
const promiseAllProps = require("../utils/promiseAll");

exports.getOverview = catchAsync(async (req, res) => {
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
    console.log(values);
    res.status(200).render("pages/overview", {
      title: "All Habits",
      something: "Welecom",
      data: values,
    });
  });
});
