const yup = require('yup');

module.exports = yup.object().shape({
  state: yup.string().trim().required('State query parameter is missing!')
});
