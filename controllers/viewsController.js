const db = require("../models/index");
const catchAsync = require("../utils/catchAsync");
const moment = require("moment");
const goals = require("../utils/data/goals.json");

exports.getOverview = catchAsync(async (req, res) => {
  // https://stackoverflow.com/questions/48707021/node-how-to-run-python-script-when-clicking-button-using-pug-and-express-node-we
  goalsArr = [];

  goals.forEach((element) => {
    db[element.modelName].findAll({
      attributes: [
        [
          db.sequelize.fn(
            element.goalMetric,
            db.sequelize.col(element.targetColumn)
          ),
          "goalResult",
        ],
      ],
    });
  });

  console.log(arry);
  res.status(200).render("pages/overview", {
    title: "All Habits",
    something: "Welecom",
    data: arry,
    // avgSleep: sum / sleeps.length / 3600000,
    // loggedToday: todaySleep,
  });
});
