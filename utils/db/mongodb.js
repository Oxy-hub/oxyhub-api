const mongoose = require('mongoose');

mongoose
  .connect(process.env.CONNECT_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MONGODB CLIENT IS READY!');
  })
  .catch(err => {
    // console.log(err);
    console.log('MONGO DB CONNECTION FAILED! TRY AGAIN!');
  });

mongoose.set('useFindAndModify', false);

module.exports = mongoose;
