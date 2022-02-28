const AppError = require('../errors/AppError');
// const BODY = "BODY";
const PARAMS = 'PARAMS';
const QUERY = 'QUERY';

const validate = async (schema, obj) => {
  const options = {
    abortEarly: false,
    stripUnknown: true
  };
  return schema.validate(obj, options);
};

// eslint-disable-next-line
exports.validateDto = (schema, option) => async (req, _, next) => {
  try {
    switch (option) {
      case PARAMS:
        req.params = await validate(schema, req.params);
        break;

      case QUERY:
        req.query = await validate(schema, req.query);
        break;

      default:
        req.body = await validate(schema, req.body);
    }

    next();
  } catch (err) {
    // console.log(err.errors);
    next(new AppError(400, 'Input validation failed!', err.errors));
  }
};
