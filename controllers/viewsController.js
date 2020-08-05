const db = require("../models/index");
const catchAsync = require("../utils/catchAsync");
//const customQueries = require("../utils/customQueries");
const moment = require("moment");
const goals = require("../utils/data/goals.json");
const promiseAllProps = require("../utils/promiseAll");

exports.getOverview = catchAsync(async (req, res) => {
  goals.forEach(function (item, i) {
    if (item.goalMetric == "custom") {
      console.log("god a custom querey");

      let rawQuery = db.sequelize
        .query(
          'SELECT avg((EXTRACT(EPOCH FROM (waketime - sleeptime)) + (pee * 10 +  interruptions * 20) )/3600) as "goalResult" FROM public."Sleep";'
        )
        .then((sqlRes) => {
          item.dbQuery = sqlRes[0][0];
        });
    } else {
      item.dbQuery = db[item.modelName].findAll({
        attributes: [
          [
            db.sequelize.fn(
              item.goalMetric,
              db.sequelize.col(item.targetColumn)
            ),
            "goalResult",
          ],
        ],
        raw: true,
      });
    }
  });

  promiseAllProps(goals).then((values) => {
    values.forEach((el) => console.log(el));
    res.status(200).render("pages/overview", {
      title: "All Habits",
      something: "Welecom",
      data: values,
    });
  });
});
