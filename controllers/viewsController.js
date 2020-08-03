const db = require("../models/index");
const catchAsync = require("../utils/catchAsync");
const moment = require("moment");
const goals = require("../utils/data/goals.json");

exports.getOverview = catchAsync(async (req, res) => {
  // https://stackoverflow.com/questions/48707021/node-how-to-run-python-script-when-clicking-button-using-pug-and-express-node-we
  let = goalsDbQueryArray = [];
  goals.forEach(function (item, i) {
    console.log(i);
    console.log(item);
    goalsDbQueryArray[i] = db[item.modelName].findAll({
      attributes: [
        [
          db.sequelize.fn(item.goalMetric, db.sequelize.col(item.targetColumn)),
          "goalResult",
        ],
      ],
      raw: true,
    });
  });

  Promise.all(goalsDbQueryArray).then((values) => {
    console.log(values.flat());

    res.status(200).render("pages/overview", {
      title: "All Habits",
      something: "Welecom",
      data: values.flat(),
    });
  });
});
