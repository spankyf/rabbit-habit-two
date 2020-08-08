// const arr = [
//   {
//     modelName: "Sleep",
//     targetColumn: "duration",
//     number: "7:30",
//     goalMetric: "sleepDuration",
//     operator: ">=",
//     format: "hours",
//     frequency: "day",
//     today: false,
//     href: "/sleep",
//     dbQuery: { goalResult: "07:43" },
//   },
//   {
//     modelName: "Exercise",
//     targetColumn: "exercise",
//     number: "15:00",
//     goalMetric: "avg",
//     operator: ">=",
//     format: "minutes",
//     frequency: "day",
//     today: false,
//     href: "/exercise",
//     dbQuery: { goalResult: "11:10" },
//   },
//   {
//     modelName: "Exercise",
//     targetColumn: "stretching",
//     number: "90%",
//     goalMetric: "avg",
//     operator: ">=",
//     format: "percentage",
//     frequency: "day",
//     today: false,
//     href: "/exercise",
//     dbQuery: { goalResult: "95.27%" },
//   },
//   {
//     modelName: "Drink",
//     targetColumn: "n_drinks",
//     number: "0.3",
//     goalMetric: "avg",
//     operator: "<=",
//     format: "units",
//     frequency: "day",
//     today: false,
//     href: "/drink",
//     dbQuery: { goalResult: "0.47" },
//   },
//   {
//     modelName: "Sensimilla",
//     targetColumn: "mg",
//     number: "15.0",
//     goalMetric: "avg",
//     operator: "<=",
//     format: "units",
//     frequency: "day",
//     today: false,
//     href: "/sensimilla",
//     dbQuery: { goalResult: "22.25" },
//   },
//   {
//     modelName: "Sensimilla",
//     targetColumn: "j",
//     number: "0.05",
//     goalMetric: "avg",
//     operator: "<=",
//     format: "units",
//     frequency: "day",
//     today: false,
//     href: "/sensimilla",
//     dbQuery: { goalResult: "0.15" },
//   },
//   {
//     modelName: "Vitamin",
//     targetColumn: "hair_oil",
//     number: "50%",
//     goalMetric: "avg",
//     operator: ">=",
//     format: "percentage",
//     frequency: "day",
//     today: false,
//     href: "/vitamin",
//     dbQuery: { goalResult: "57.75%" },
//   },
// ];

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
