const express = require("express");
const pyController = require("../controllers/pyController");

const router = express.Router();

router.route("/").get(pyController.getPython);
// .post(sleepController.addSleep);

// router
//   .route("/:date")
//   .get(sleepController.getSleep)
//   .delete(sleepController.deleteSleep)
//   .patch(sleepController.updateSleep);

module.exports = router;
