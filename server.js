const express = require("express");
const path = require("path");
const morgan = require("morgan");
const db = require("./models");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const sleepRouter = require("./routes/sleepRoutes");
const viewRouter = require("./routes/viewRoutes");
const userRouter = require("./routes/userRoutes");
const seedData = require("./utils/seederFunction");

const app = express();
app.locals.moment = require("moment");

const port = process.env.PORT || 8080;

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
  .use("/users", userRouter)

  .use("/", viewRouter)
  .use(express.static(path.join(__dirname, "public")))
  .use(globalErrorHandler)
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "pug");

// undhandled route handler - all is for all http methods
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`));
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
