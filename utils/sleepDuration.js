module.exports = (testObj) => {
  const lostTime = testObj.pee * 10 + testObj.interruptions * 20;
  const duration = Date.parse(testObj.waketime) - Date.parse(testObj.sleeptime);
  return (duration - lostTime) / 3600000;
};
