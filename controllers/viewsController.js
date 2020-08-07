const catchAsync = require("../utils/catchAsync");
const customQueries = require("../utils/customQueries");
const promiseAllProps = require("../utils/promiseAll");
const formatOverview = require("../utils/formatOverview");

exports.getOverview = catchAsync(async (req, res) => {
  const goalsArr = customQueries();

  promiseAllProps(goalsArr).then((values) => {
    const overviews = formatOverview(values);
    console.log(overviews);
    res.status(200).render("pages/overview", {
      title: "All Habits",
      something: "Welecom",
      data: overviews,
    });
  });
});
