const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const path = require('path');
const routes = require('../routes');
const middlewares = require('../middlewares');
const errors = require('../errors');
const config = require('../config');

module.exports = (app, { swaggerSpec }) => {
  /** SERVER SETTINGS */
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));

  /** 3RD PARTY MIDDLEWARES */
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
  );

  app.use(
    cors({
      origin: config.origin,
      credentials: true
    })
  );

  app.use(cookieParser());

  app.use(express.json());

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  /** CUSTOM MIDDLEWARES */
  middlewares.init(app);

  /** INITIALIZE ROUTES */
  const router = express.Router();
  app.use(config.apiPrefix, routes.init(router));
  app.use((_, res) => {
    res
      .status(404)
      .send({ httpStatus: 404, message: 'Resource could not be found!' });
  });

  /** ERROR HANDLER */
  errors.init(app);

  return app;
};
