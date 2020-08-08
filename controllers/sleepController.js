const moment = require("moment");
const catchAsync = require("../utils/catchAsync");
const calculateSleepDuration = require("../utils/sleepDuration");
const db = require("../models");

exports.getAllSleeps = catchAsync(async (req, res) => {
  const sleeps = await db.Sleep.findAll({ order: [["date", "ASC"]] });
  let todayLogged = false;
  console.log(sleeps.slice(-1)[0].dataValues.date);
  if (sleeps.slice(-1)[0].dataValues.date == moment().format("YYYY-MM-DD")) {
    todayLogged = true;
  }
  res.status(200).render("pages/sleep", {
    title: "Sleep Report",
    // len: sleeps.length,
    todayLogged: todayLogged,
    title: "Sleep",
  });
});

exports.getSleep = catchAsync(async (req, res) => {
  const newDay = await db.Sleep.findByPk(req.params.date);
  res.status(200).render("pages/sleep", {
    title: "Sleep Report",

    data: newDay,
  });
});

exports.addSleep = catchAsync(async (req, res) => {
  const reqBody = req.body;
  req.body.duration = calculateSleepDuration(reqBody);

  const newSleep = await db.Sleep.create(req.body);
  console.log(req.body);
  res.status(201).render("pages/sleep", {
    status: "success",
    data: newSleep,
  });
});

exports.deleteSleep = catchAsync(async (req, res) => {
  await db.Sleep.destroy({ where: { date: req.params.date } });

  res.status(204).json({
    status: "success",
  });
});

exports.updateSleep = catchAsync(async (req, res) => {
  const updatedSleep = await db.Sleep.update(req.body, {
    where: { date: req.params.date },
    returning: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedSleep,
  });
});
