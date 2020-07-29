const spawn = require("child_process").spawn;

const process = spawn("python", ["-u", "../tests/sleep_stats.py"]);

process.stdout.on("data", function (data) {
  console.log(data.toString("utf8"));
});
