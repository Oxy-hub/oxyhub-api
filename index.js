const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const admin = require('firebase-admin');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoutes);
app.listen(8000, () => {
  console.log('LISTENING ON PORT 8000');
});
