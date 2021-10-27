const yup = require('yup');

const authRequestDto = yup.object().shape({
  code: yup.string().required('OAuth code is missing!')
});

module.exports = authRequestDto;
