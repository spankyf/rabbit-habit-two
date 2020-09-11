const spawn = require("child_process").spawn;

const process = spawn("python", ["-u", "../utils/make_graph.py"]);

process.stdout.on("data", function (data) {
  console.log(data.toString("utf8"));
});
