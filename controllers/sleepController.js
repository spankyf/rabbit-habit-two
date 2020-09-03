const moment = require("moment");
const catchAsync = require("../utils/catchAsync");
const calculateSleepDuration = require("../utils/sleepDuration");
const db = require("../models");
const path = require("path");

const { PythonShell } = require("python-shell");

exports.getAllSleeps = catchAsync(async (req, res) => {
  const sleeps = await db.Sleep.findAll({ order: [["date", "ASC"]] });

  req.app.locals.todayLogged =
    sleeps.slice(-1)[0].dataValues.date == moment().format("YYYY-MM-DD")
      ? true
      : false;
  res.status(200).render("pages/sleep", {
    title: "Sleep Report",
  });
});

exports.getSleep = catchAsync(async (req, res) => {
  const newDay = await db.Sleep.findByPk(req.params.date);

  res.status(200).render("pages/sleep", {
    title: "Sleep Report",

    data: newDay,
  });
});

exports.sleepGraph = catchAsync(async (req, res, next) => {
  const options = {
    mode: "text",
    scriptPath: path.join(__dirname, "..", "utils"),
  };

  let pyshell = new PythonShell("make_graph.py", options);

  pyshell.on("message", function (data) {
    console.log(data);
    res.locals.pngPath = path.join(
      __dirname,
      "..",
      "public",
      "latestGraph.png"
    );
    next();
  });

  pyshell.end(function (err, code, signal) {
    if (err) throw err;
    console.log("The exit code was: " + code);
    console.log("The exit signal was: " + signal);
    console.log("finished");
    // next();
  });
});

exports.addSleep = catchAsync(async (req, res) => {
  const reqBody = req.body;
  req.body.duration = calculateSleepDuration(reqBody);

  const newSleep = await db.Sleep.create(req.body);
  console.log(req.body);
  req.app.locals.todayLogged = true;
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
