const yup = require('yup');

module.exports = yup.object().shape({
  first_name: yup.string().trim().required('First name cannot be empty!'),
  middle_name: yup.string().trim(),
  last_name: yup.string().trim().required('Last name cannot be empty!')
});
