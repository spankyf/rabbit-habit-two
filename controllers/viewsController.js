const catchAsync = require("../utils/catchAsync");
const customQueries = require("../utils/customQueries");
const promiseAllProps = require("../utils/promiseAll");

exports.getOverview = catchAsync(async (req, res) => {
  const goalsArr = customQueries();

  promiseAllProps(goalsArr).then((values) => {
    values.forEach((el) => console.log(el));
    res.status(200).render("pages/overview", {
      title: "All Habits",
      something: "Welecom",
      data: values,
    });
  });
});
