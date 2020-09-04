const compareGoals = require("./compareGoals");

module.exports = (arr) => {
  // console.log(arr);
  // console.log("                                ****");
  arr.forEach((el) => {
    // console.log(el);
    if (el.operator == ">=") {
      el.passing = el.number >= el.dbQuery.goalResult;
    } else if (el.operator == "<=") {
      el.passing = el.number <= el.dbQuery.goalResult;
    }

    if (el.format == "percentage") {
      el.dbQuery.goalResult =
        parseFloat(el.dbQuery.goalResult * 100)
          .toFixed(2)
          .toString() + "%";
    } else if (el.format == "hours" || el.format == "minutes") {
      var n = new Date(0, 0);

      n.setSeconds(+el.dbQuery.goalResult.toString() * 60 * 60);
      el.dbQuery.goalResult = n.toTimeString().slice(0, 5);
    } else {
      el.dbQuery.goalResult = parseFloat(el.dbQuery.goalResult).toFixed(2);
    }
  });
  //return arr;
  const res = compareGoals(arr);
  return res;
};
