module.exports = (arrayOfObjects) => {
  // handy fucntion from https://stackoverflow.com/questions/45022279/dealing-with-an-array-of-objects-with-promises
  // allows promise.all return from nested promises

  let datum = [];
  let promises = [];

  arrayOfObjects.forEach(function (obj, index) {
    Object.keys(obj).forEach(function (prop) {
      let val = obj[prop];
      // if it smells like a promise, lets track it
      if (val && val.then) {
        promises.push(val);
        // and keep track of where it came from
        datum.push({ obj: obj, prop: prop });
      }
    });
  });

  return Promise.all(promises).then(function (results) {
    // now put all the results back in original arrayOfObjects in place of the promises
    // so now instead of promises, the actaul values are there
    results.forEach(function (val, index) {
      console.log(val);
      // get the info for this index
      let info = datum[index];
      // use that info to know which object and which property this value belongs to
      info.obj[info.prop] = val[0];
    });
    // make resolved value be our original (now modified) array of objects
    return arrayOfObjects;
  });
};
