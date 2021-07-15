const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const authRoutes = require('./routes/authRoutes');
const registerRoutes = require('./routes/registerRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const protectedRoutes = require('./utils/protectedRoutes');
require('dotenv').config();

console.log('CONNECTING TO DATABASE...');
mongoose
  .connect(process.env.CONNECT_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('CONNECTED TO DB!');
  })
  .catch(err => {
    console.log(err);
    console.log('CONNECTION FAILED! TRY AGAIN!');
  });
mongoose.set('useFindAndModify', false);

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

app.listen(8000, () => {
  console.log('LISTENING ON PORT 8000');
});
