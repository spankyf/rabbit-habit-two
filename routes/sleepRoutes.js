const express = require("express");
const sleepController = require("../controllers/sleepController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    sleepController.sleepGraph,
    sleepController.getAllSleeps
  )
  .post(sleepController.addSleep);

router
  .route("/:date")
  .get(sleepController.getSleep)
  .delete(authController.protect, sleepController.deleteSleep)
  .patch(authController.protect, sleepController.updateSleep);

module.exports = router;
