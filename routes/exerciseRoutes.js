const express = require("express");
const exerciseController = require("../controllers/exerciseController");

const router = express.Router();

router
  .route("/")
  .get(exerciseController.getAllExercises)
  .post(exerciseController.addExercise);

router
  .route("/:date")
  .get(exerciseController.getExercise)
  .delete(exerciseController.deleteExercise)
  .patch(exerciseController.updateExercise);

module.exports = router;
