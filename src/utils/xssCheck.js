const xss = require('xss');

module.exports = object => {
  const newObject = '';
  Object.keys(object).forEach(key => {
    const purified = xss(newObject[key]);
    newObject[key] = purified;
  });
  return object;
};
