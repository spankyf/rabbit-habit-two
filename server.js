const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const morgan = require("morgan");
const sleepRouter = require("./routes/sleepRoutes");

app.use(morgan("dev"));

app
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "pug");

// app.get("/", (req, res) => res.send("Hello World!"));
app.use("/sleep", sleepRouter);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
