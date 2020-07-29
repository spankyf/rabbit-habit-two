const catchAsync = require("../utils/catchAsync");
const db = require("../models");

exports.getAllSleeps = catchAsync(async (req, res) => {
  const sleeps = await db.Sleep.findAll({ order: [["date", "ASC"]] });

  sleeps.forEach((element) => {
    console.log(element.dataValues.waketime - element.dataValues.bedtime);
  });
  res.status(201).json({
    status: "success",
    len: sleeps.length,
    data: sleeps,
  });
});

exports.getSleep = catchAsync(async (req, res) => {
  const newDay = await db.Sleep.findByPk(req.params.date);
  res.status(200).json({
    status: "success",
    data: newDay,
  });
});

exports.addSleep = catchAsync(async (req, res) => {
  const newSleep = await db.Sleep.create(req.body);
  res.status(201).json({
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
