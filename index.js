const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const admin = require('firebase-admin');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
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
    console.log('CONNECTION FAILED! TRY AGAIN!');
  });

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoutes);
app.listen(8000, () => {
  console.log('LISTENING ON PORT 8000');
});
