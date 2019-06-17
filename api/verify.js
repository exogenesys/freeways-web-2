const jwt = require('jsonwebtoken');
const User = require('../models/users');

// Used to Create,Sign and Verify Tokens

const config = require('../authconfig.js');

exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, {
    expiresIn: 3600, // in secs
  });
};

exports.verifyOrdinaryUser = function (req, res, next) {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        var err = new Error('You are not Authenticated! ');
        err.status = 401;
        return next(err);
      }
      // if Everything is Good, save to request for use in Other routes
      req.decoded = decoded;
      next();
    });
  } else {
    // If there is no Token
    // return an error
    const err = new Error('No Token Provided ! ');
    err.status = 403;
    return next(err);
  }
};
