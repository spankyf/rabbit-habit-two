module.exports = (arr) => {
  arr.forEach((el) => {
    let pass;
    if (el.format == "percentage") {
      if (el.operator == ">=") {
        pass =
          el.number.replace("%", "") < el.dbQuery.goalResult.replace("%", "");
      } else {
        pass =
          el.number.replace("%", "") > el.dbQuery.goalResult.replace("%", "");
      }
    } else if (el.format == "hours" || el.format == "minutes") {
      goalTimes = el.number.split(":");
      resTimes = el.dbQuery.goalResult.split(":");

      goalMins = Number(goalTimes[0] * 60) + Number(goalTimes[1]);
      resMins = Number(resTimes[0] * 60) + Number(resTimes[1]);

      if (el.operator == ">=") {
        pass = resMins > goalMins;
      } else {
        pass = resMins < goalMins;
      }
    } else {
      if (el.operator == ">=") {
        pass = el.number < el.dbQuery.goalResult;
      } else {
        pass = el.number > el.dbQuery.goalResult;
      }
    }
    el.passing = pass;
  });
  return arr;
};
