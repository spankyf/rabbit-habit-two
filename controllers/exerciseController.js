const catchAsync = require("../utils/catchAsync");
const db = require("../models");

exports.getAllExercises = catchAsync(async (req, res) => {
  const exercises = await db.Exercise.findAll({ order: [["date", "ASC"]] });
  var sum = 0;
  exercises.forEach((element) => {
    sum += element.dataValues.exercise;
  });

  res.status(200).render("pages/exercise", {
    title: "Exercise Report",
    len: exercises.length,
    avgExercise: sum / exercises.length,
  });
});

exports.getExercise = catchAsync(async (req, res) => {
  const newDay = await db.Exercise.findByPk(req.params.date);
  res.status(200).json({
    status: "success",
    data: newDay,
    db: db,
  });
});

exports.addExercise = catchAsync(async (req, res) => {
  const newExercise = await db.Exercise.create(req.body);
  res.status(201).render("pages/exercise", {
    status: "success",
    data: newExercise,
  });
});

exports.deleteExercise = catchAsync(async (req, res) => {
  await db.Exercise.destroy({ where: { date: req.params.date } });

  res.status(204).json({
    status: "success",
  });
});

exports.updateExercise = catchAsync(async (req, res) => {
  const updatedExercise = await db.Exercise.update(req.body, {
    where: { date: req.params.date },
    returning: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedExercise,
  });
});
