const express = require("express");
const sleepController = require("../controllers/sleepController");

const router = express.Router();

router
  .route("/")
  .get(sleepController.getAllSleeps)
  .post(sleepController.addSleep);

router
  .route("/:date")
  .get(sleepController.getSleep)
  .delete(sleepController.deleteSleep)
  .patch(sleepController.updateSleep);

module.exports = router;
