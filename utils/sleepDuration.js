// const obj = {
//   date: "2020-08-05",
//   rating_from_five: "3",
//   dreams_from_three: "1",
//   interruptions: "0",
//   pee: "0",
//   bedtime: "2020-08-03T22:45",
//   sleeptime: "2020-08-03T23:30",
//   waketime: "2020-08-04T07:30",
// };

module.exports = (testObj) => {
  const lostTime = testObj.pee * 10 + testObj.interruptions * 20;
  const duration = Date.parse(testObj.waketime) - Date.parse(testObj.sleeptime);
  return (duration - lostTime) / 3600000;
};
