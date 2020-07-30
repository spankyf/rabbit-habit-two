const catchAsync = require("../utils/catchAsync");
const db = require("../models");

exports.sleepStats = catchAsync(async () => {
  const sleeps = await db.Sleep.findAll({ order: [["date", "ASC"]] });
  var sum = 0;
  sleeps.forEach((element) => {
    sum += element.dataValues.waketime - element.dataValues.bedtime;
  });
  //   console.log(sum / sleeps.length);
  return sum / sleeps.length;
});
