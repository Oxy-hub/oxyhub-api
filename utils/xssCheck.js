const xss = require('xss');

module.exports = object => {
  for (const prop in object) {
    //   console.log(`${property}: ${object[property]}`);
    let purified = xss(object[prop]);
    object[prop] = purified;
  }
  return object;
};
