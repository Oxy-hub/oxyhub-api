const admin = require('firebase-admin');
exports.idTokenVerification = (req, res, next) => {
  admin
    .auth()
    .verifyIdToken(req.body.idToken)
    .then(decodedToken => {
      const phoneNumber = decodedToken.phone_number;
      req.phoneNumber = parseInt(phoneNumber.substring(3));
      console.log('Id token verified', phoneNumber);
      // res.send({ status: true });
      next();
    })
    .catch(error => {
      // Handle error
      console.log('Id token verification failed');
      res.send({ status: false });
    });
};
