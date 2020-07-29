const db = require("../models/index");
const catchAsync = require("../utils/catchAsync");
const spawn = require("child_process").spawn;

exports.getOverview = catchAsync(async (req, res) => {
  // https://stackoverflow.com/questions/48707021/node-how-to-run-python-script-when-clicking-button-using-pug-and-express-node-we

  res.status(200).render("pages/overview", {
    title: "All Habits",
    something: "Welecom",
  });
});
