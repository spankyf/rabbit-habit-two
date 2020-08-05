const db = require("../models/index");
const catchAsync = require("../utils/catchAsync");
//const customQueries = require("../utils/customQueries");
const moment = require("moment");
const goals = require("../utils/data/goals.json");
const promiseAllProps = require("../utils/promiseAll");

exports.getOverview = catchAsync(async (req, res) => {
  //  if item.goalMetric = custom, use custom function to get info
  goals.forEach(function (item, i) {
    // if (item.goalMetric == "custom") {
    //   console.log("god a custom querey");
    //   // item.dbQuery = customQueries(item);
    //   item.dbQuery = { goalResult: null };
    // } else {
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
