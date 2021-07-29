const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
const authRoutes = require('./routes/authRoutes');
const refreshRoutes = require('./routes/refreshRoutes');
const registerRoutes = require('./routes/registerRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const protectedRoutes = require('./utils/protectedRoutes');
require('dotenv').config();

require('./utils/db/mongodb');
require('./utils/db/redis');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

/** 3RD PARTY MIDDLEWARES */
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
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

app.listen(8000, () => {
  console.log('LISTENING ON PORT 8000');
});
