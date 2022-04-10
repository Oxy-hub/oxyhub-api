const yup = require('yup');

const authRequestDto = yup.object().shape({
  code: yup.string().required('OAuth code is missing!'),
  provider: yup.string().oneOf(['google', 'github'])
});

module.exports = authRequestDto;
