const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const morgan = require("morgan");
const db = require("./models");
const fs = require("fs");
const sleepRouter = require("./routes/sleepRoutes");
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
  .use(morgan("dev"))
  .use("/sleep", sleepRouter)
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "pug");

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
