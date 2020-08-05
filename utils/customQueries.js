module.exports = () => {
  const goals = require("../utils/data/goals.json");
  const db = require("../models/index");
  const moment = require("moment");

  goals.forEach(function (item) {
    item.today = db[item.modelName].findByPk(moment().format("YYYY-MM-DD")); //moment().format("YYYY-MM-DD"));
    item.href = `/${item.modelName.toLowerCase()}`;

    if (item.goalMetric == "custom") {
      let rawQuery = db.sequelize
        .query(
          'SELECT avg((EXTRACT(EPOCH FROM (waketime - sleeptime)) + (pee * 10 +  interruptions * 20) )/3600) as "goalResult" FROM public."Sleep";'
        )
        .then((sqlRes) => {
          item.dbQuery = sqlRes[0][0];
        });
    } else {
      item.dbQuery = db[item.modelName].findAll({
        attributes: [
          [
            db.sequelize.fn(
              item.goalMetric,
              db.sequelize.col(item.targetColumn)
            ),
            "goalResult",
          ],
        ],
        raw: true,
      });
    }
  });
  //   console.log(goals);
  return goals;
};
