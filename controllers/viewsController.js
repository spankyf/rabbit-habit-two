const catchAsync = require("../utils/catchAsync");
const customQueries = require("../utils/customQueries");
const promiseAllProps = require("../utils/promiseAll");
const formatOverview = require("../utils/formatOverview");

exports.addSandwich = (req, res, next) => {
  req.app.locals.sandwich = "I love egg       ********************************";
  next();
};

exports.getOverview = catchAsync(async (req, res) => {
  const goalsArr = customQueries();

  promiseAllProps(goalsArr).then((values) => {
    // console.log(values);

    // console.log(req.app.locals.sandwich);
    // console.log(values); this is where you have to make into modular middle ware & design front
    const overviews = formatOverview(values);
    res.status(200).render("pages/overview", {
      title: "All Habits",
      something: "Welecom",
      data: overviews,
    });
  });
});
