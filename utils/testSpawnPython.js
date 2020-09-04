const pyData = require("../utils/spawnPython");
var promise = Promise.resolve(pyData());

promise.then(
  (result) => console.log(result), // shows "done!" after 1 second
  (error) => console.log(error) // doesn't run
);
