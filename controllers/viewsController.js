const db = require("../models/index");
const catchAsync = require("../utils/catchAsync");
const moment = require("moment");

exports.getOverview = catchAsync(async (req, res) => {
  // https://stackoverflow.com/questions/48707021/node-how-to-run-python-script-when-clicking-button-using-pug-and-express-node-we
  const sleeps = await db.Sleep.findAll({ order: [["date", "ASC"]] });
  const habitArray = [];
  // manually getting habit stats and making object... make it better later
  var sum = 0;
  var todaySleep = false;

  sleeps.forEach((element) => {
    sum += element.dataValues.waketime - element.dataValues.sleeptime;
    if (element.dataValues.date === moment().format("YYYY-MM-DD")) {
      todaySleep = true;
    }
  });
  // make array of habits and then iterate over theme in the template
  res.status(200).render("pages/overview", {
    title: "All Habits",
    something: "Welecom",
    avgSleep: sum / sleeps.length / 3600000,
    loggedToday: todaySleep,
  });
});
