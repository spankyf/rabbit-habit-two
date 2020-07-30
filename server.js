const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const morgan = require("morgan");
const db = require("./models");
const fs = require("fs");
const bodyParser = require("body-parser");

const sleepRouter = require("./routes/sleepRoutes");
const viewRouter = require("./routes/viewRoutes");
const catchAsync = require("./utils/catchAsync");

const seedData = catchAsync(async (req, res) => {
  const seed = await db.Sleep.bulkCreate(
    JSON.parse(
      fs.readFileSync(path.join(__dirname, "utils", "data", "sleep.json"))
    )
  );
  console.log("Sleep data seeded");
});

db.sequelize.sync({ force: true }).then(() => {
  seedData();
  console.log("Drop and re-sync db.");
});

app
  .use(express.static(path.join(__dirname, "public")))
  // .use(morgan("dev"))
  // .use(bodyParser.json())
  .use("/sleep", sleepRouter)
  .use("/", viewRouter)
  .use(express.json({ limit: "10kb" }))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
