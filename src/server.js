const express = require('express');
const loaders = require('./loaders');

module.exports = async () => {
  const app = express();
  await loaders(app);
  return app;
};

// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const morgan = require('morgan');

// const app = express();
// const authRoutes = require('./routes/authRoutes');
// const refreshRoutes = require('./routes/refreshRoutes');
// const registerRoutes = require('./routes/registerRoutes');
// const logoutRoutes = require('./routes/logoutRoutes');
// const authMiddleware = require('./middlewares/authMiddleware');
// const handleError = require('./middlewares/handleError');
// const protectedRoutes = require('./utils/helpers/protectedRoutes');

// require('./utils/db/mongodb');
// require('./utils/db/redis');

// /** 3RD PARTY MIDDLEWARES */
// app.use(
//   morgan(':method :url :status :res[content-length] - :response-time ms')
// );

// app.use(
//   cors({
//     origin: ['http://localhost:3000', 'https://oxyhub.netlify.app'],
//     credentials: true
//   })
// );

// app.use(cookieParser());

// app.use(express.json());

// /** CUSTOM MIDDLEWARES */
// app.use(protectedRoutes, authMiddleware);

// /** ROUTES */
// app.use('/auth', authRoutes);
// app.use('/register', registerRoutes);
// app.use('/refresh', refreshRoutes);
// app.use('/logout', logoutRoutes);
// app.all('/*', (_, res) => res.sendStatus(404));

// /** ERROR HANDLER */
// app.use(handleError);

// module.exports = app;
