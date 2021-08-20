const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
const authRoutes = require('./routes/authRoutes');
const refreshRoutes = require('./routes/refreshRoutes');
const registerRoutes = require('./routes/registerRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const protectedRoutes = require('./utils/protectedRoutes');

const handleError = require('./middlewares/handleError');
require('dotenv').config();

require('./utils/db/mongodb');
require('./utils/db/redis');

const PORT = process.env.PORT || 8000;

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

/** 3RD PARTY MIDDLEWARES */
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://oxyhub.netlify.app'],
    credentials: true
  })
);

app.use(cookieParser());

app.use(express.json());

/** CUSTOM MIDDLEWARES */
app.use(protectedRoutes, authMiddleware);

/** ROUTES */
app.use('/auth', authRoutes);
app.use('/register', registerRoutes);
app.use('/refresh', refreshRoutes);
app.use('/logout', logoutRoutes);
app.all('/*', (_, res) => res.sendStatus(404));

/** ERROR HANDLER */
app.use(handleError);

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
