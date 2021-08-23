const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const config = require('../config');

module.exports = app => {
  /** 3RD PARTY MIDDLEWARES */
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
  );

  app.use(
    cors({
      origin: config.origins,
      credentials: true
    })
  );

  app.use(cookieParser());

  app.use(express.json());

  /** CUSTOM MIDDLEWARES */
  // app.use(protectedRoutes, authMiddleware);

  /** ROUTES */
  //   app.use('/auth', authRoutes);
  //   app.use('/register', registerRoutes);
  //   app.use('/refresh', refreshRoutes);
  //   app.use('/logout', logoutRoutes);
  //   app.all('/*', (_, res) => res.sendStatus(404));

  /** ERROR HANDLER */
  //   app.use(handleError);
};
