const yup = require('yup');

module.exports = yup.object().shape({
  parlour_id: yup.string().trim().required('Parlour id is missing!'),
  type: yup.number().oneOf([0, 1]).required('Type is missing!')
});
