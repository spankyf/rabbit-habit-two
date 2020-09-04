module.exports = (arr) => {
  // console.log(arr);
  var operators = {
    "<=": function (a, b) {
      return a <= b;
    },
    ">=": function (a, b) {
      return a >= b;
    },
  };

  function convertNumToTime(number) {
    // Separate the int from the decimal part
    var hour = Math.floor(number);
    var decpart = number - hour;

    var min = 1 / 60;
    // Round to nearest minute
    decpart = min * Math.round(decpart / min);

    var minute = Math.floor(decpart * 60) + "";

    // Add padding if need
    if (minute.length < 2) {
      minute = "0" + minute;
    }

    // Concate hours and minutes
    time = hour + ":" + minute;

    return time;
  }
  arr.forEach((el) => {
    el.passing = operators[el.operator](el.dbQuery.goalResult, el.number);

    if (el.format == "time") {
      el.number = convertNumToTime(el.number);
      el.current = convertNumToTime(el.dbQuery.goalResult);
    } else if (el.format == "percentage") {
      el.number = (el.number * 100).toFixed(2) + "%";
      el.current = (el.dbQuery.goalResult * 100).toFixed(2) + "%";
    } else {
      el.current = el.dbQuery.goalResult.toFixed(2);
    }
  });
  return arr;
  // const res = compareGoals(arr);
  // return res;
};
