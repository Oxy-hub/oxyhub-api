const { generateAccessToken, generateRefreshToken } = require('../../utils/tokenGenerator');
const { v4: uuidv4 } = require('uuid');
const User = require('../../models/user');
const redis = require('redis');
const client = redis.createClient();
exports.generateTokens = (req, res, next) => {
  try {
    //Access token generation using jsonwebtoken
    const accessToken = generateAccessToken({ email: req.user.email });

    //Creating the random jti
    const jti = uuidv4();

    //Refresh token generation using jsonwebtoken
    const refreshToken = generateRefreshToken({ jti, email: req.user.email });

    //Storing refresh token in Redis
    client.set(
      `${req.user.user_id}:${jti}`,
      0,
      'EX',
      parseInt(process.env.REDIS_EXPIRY),
      (err, response) => {
        console.log('Redis response', response);
        client.keys('*', (err, res) => {
          if (err) console.log('Redis error from get', err);
          console.log('This is keys response', res);
        });
        if (err) console.log('Redis error', err);
        //Sending back HTTPonly cookie in response object
        res
          .cookie('RTK', refreshToken, {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 * 1000,
            secure: true,
          })
          .send({ accessToken, user: req.user });
      }
    );
  } catch (err) {
    console.log('This error is from generateTokens : ', err);
  }
};
