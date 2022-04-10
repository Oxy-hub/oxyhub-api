const yup = require('yup');

const authRequestDto = yup.object().shape({
  code: yup.string().required('OAuth code is missing!'),
  provider: yup
    .string()
    .oneOf(
      ['google', 'github'],
      'Provider must be one of the following : google, github'
    )
    .required('Provider must be mentioned!')
});

module.exports = authRequestDto;
