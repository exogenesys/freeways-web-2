const express = require('express');

const router = express.Router();
const passport = require('passport');
const User = require('../models/users');
const Verify = require('./verify');

// Get Users Listing

router.get('/', (req, res, next) => {
  res.send('Respond With A Resource');
});

router.post('/register', (req, res) => {
  User.register(new User({ username: req.body.username }),

    req.body.password, (err, user) => {
      if (err) {
        return res.status(500).json({ err });
      }

      passport.authenticate('local')(req, res, () => res.status(200).json({ status: 'Registration Successfully !' }));
    });
});


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info,
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user',
        });
      }

      console.log('User in Users: ', user);

      const token = Verify.getToken(user);

      res.status(200).json({
        status: 'Login Successfully !',
        success: true,
        token,
      });
    });
  })(req, res, next);
});


router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({
    status: 'BYE !',
  });
});


module.exports = router;
