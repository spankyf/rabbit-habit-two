// const express = require("express");
// const app = express();
// const spawn = require("child_process").spawn;

// app.listen(4000, () => {
//   console.log("server running on port 3000");
// });

// app.get("/name", (req, res) => {
//   const firstName = req.query["firstname"],
//     lastName = req.query["lastname"];

//   if (!firstName || !lastName) {
//     res.status(401).send("missing-fields");
//   }

//   const process = spawn("python", ["./hello.py", firstName, lastName]);

//   let result = "";

//   process.stdout.on("data", (data) => {
//     result += data.toString();
//   });

//   process.on("close", (code) => {
//     res.send(result);
//   });
// });

const spawn = require("child_process").spawn;
const process = spawn("python", ["./hello.py", "dean", "kyle"]);

let result = "";

process.stdout.on("data", (data) => {
  result += data.toString();
});

process.on("close", (code) => {
  console.log(code);
  console.log("closed connection");
  //res.send(result);
});
