const path = require("path");
var os = require("os");

const { PythonShell } = require("python-shell");
// const spawn = require("child_process").spawn;
// const process = spawn("python", ["./hello.py", "dean", "kyle"]);

// let result = "";

// process.stdout.on("data", (data) => {
//   result += data.toString();
// });

// process.on("close", (code) => {
//   console.log(code);
//   console.log("closed connection");
//   //res.send(result);
// });

let options;

const pyScriptPath = path.join(__dirname, "..");
// console.log(typeof pyScriptPath);
if (os.hostname() == "LFCANONTDFLANA") {
  options = {
    mode: "text",
    pythonPath:
      "C:/Users/dean.flanagan/AppData/Local/Continuum/anaconda3/python.exe",
    // pythonOptions: ["-u"], // get prizt results in real-time
    scriptPath: "./",
    // args: ['vale1', 'value2', 'value3']
  };
} else {
  options = {};
}
// console.log(options);
let pyshell = new PythonShell("make_graph.py", options);

pyshell.on("message", function (data) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(data);
  res.locals.pngPath = path.join(__dirname, "../public/latestGraph.png");
});

// end the input stream and allow the process to exit
pyshell.end(function (err, code, signal) {
  if (err) throw err;
  console.log("The exit code was: " + code);
  console.log("The exit signal was: " + signal);
  console.log("finished");
});
