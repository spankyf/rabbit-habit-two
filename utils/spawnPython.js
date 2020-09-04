const path = require("path");
const { PythonShell } = require("python-shell");

module.exports = function () {
  const options = {
    mode: "text",
    scriptPath: path.join(__dirname, "..", "utils"),
  };

  let result = "";
  let pyshell = new PythonShell("sleep_stats.py", options);
  pyshell.on("message", function (data) {
    //console.log(data);
    console.log("Middleware - python process finished - sleep_stats.py");
    return data;
  });
  pyshell.end(function (err, code, signal) {
    if (err) throw err;
    return err;
  });
};
