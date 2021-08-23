const mongoose = require('mongoose');
const config = require('../config');

module.exports = async () => {
  try {
    await mongoose.connect(config.mongo.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MONGODB CLIENT IS READY!');
  } catch (e) {
    console.log('MONGO DB CONNECTION FAILED! EXITING!');
    console.log(e);
    process.exit();
  }
};
