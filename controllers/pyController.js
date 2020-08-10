// const moment = require("moment");
const catchAsync = require("../utils/catchAsync");
// const db = require("../models");

exports.getPython = catchAsync(async (req, res) => {
  function sendToPython() {
    var { PythonShell } = require("python-shell");

    let options = {
      mode: "text",
      pythonPath: "C:/Python27/python.exe",
      // args: [input.value],
    };

    PythonShell.run(
      "C:/Users/Dean/Desktop/coding/rabbit-habit-two/utils/hello.py",
      options,
      function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log("results: ", results);
        results.textContent = results[0];
      }
    );
  }
  const data = await sendToPython();
  res.status(200).render("pages/python", {
    title: "Hello Python",
    // len: sleeps.length,
    data,
  });
});
