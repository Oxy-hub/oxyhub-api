const admin = require('firebase-admin');
exports.idTokenVerification = (req, res, next) => {
  // res.send('POST request to the homepage');
  console.log('This is body', req.body);
  admin
    .auth()
    .verifyIdToken(req.body.idToken)
    .then(decodedToken => {
      const uid = decodedToken.uid;
      console.log('Id token verified');
      // res.send({ status: true });
      next();
    })
    .catch(error => {
      // Handle error
      console.log('Id token verification failed');
      res.send({ status: false });
    });
};
