const db = require("../models/index");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res) => {
  // https://stackoverflow.com/questions/48707021/node-how-to-run-python-script-when-clicking-button-using-pug-and-express-node-we
  const sleeps = await db.Sleep.findAll({ order: [["date", "ASC"]] });
  var sum = 0;
  var todaySleep = false;
  const todayDate = new Date().toISOString().split("T")[0];
  sleeps.forEach((element) => {
    sum += element.dataValues.waketime - element.dataValues.sleeptime;
    console.log(element.dataValues.date);
    if (element.dataValues.date === todayDate) {
      console.log("             ***********************");
      console.log(element.dataValues.date, todayDate);
      console.log("             ***********************");
    }
  });

  res.status(200).render("pages/overview", {
    title: "All Habits",
    something: "Welecom",
    avgSleep: sum / sleeps.length / 3600000,
  });
});
