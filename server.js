const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const morgan = require("morgan");
const db = require("./models");
const bodyParser = require("body-parser");

const sleepRouter = require("./routes/sleepRoutes");
const viewRouter = require("./routes/viewRoutes");
const exerciseRouter = require("./routes/exerciseRoutes");

const seedData = require("./utils/seederFunction");

app.locals.moment = require("moment");

db.sequelize.sync({ force: true }).then(() => {
  seedData();
  console.log("Drop and re-sync db.");
});

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, "public")))
  .use(morgan("dev"))
  .use("/sleep", sleepRouter)
  .use("/exercise", exerciseRouter)
  .use("/", viewRouter)
  .use(express.json({ limit: "10kb" }))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "pug");

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
