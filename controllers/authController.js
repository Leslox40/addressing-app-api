const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const secretKey = require('../config/config');

const userController = {};

// Post registration
userController.doRegister = function (req, res) {
  const { email, username, password } = req.body;

  // create user and log them in
  const newUser = new User({ email, username });

  User.register(newUser, password, (err, user) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Your account could not be saved. Error: ',
        err
      });
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });

    return res.json({
      success: true,
      message: 'Your account has been saved',
      user
    });
  });
};

// Post login
userController.doLogin = (req, res) => {
  if (!req.body.username) {
    res.json({
      success: false,
      message: 'Username was not given',
    });
  } else if (!req.body.password) {
    res.json({
      success: false,
      message: 'Password was not given'
    });
  } else {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        res.json({
          success: false,
          message: err
        });
      } else if (!user) {
        res.json({
          success: false,
          message: 'username or password incorrect'
        });
      } else {
        req.login(user, (err) => {
          if (err) {
            res.json({
              success: false,
              message: err
            });
          }
          const token = jwt.sign({ userId: user._id, username: user.username }, secretKey.coolThirdPartyApiKey, { expiresIn: '24h' });

          res.sendStatus(201).json({ success: true, message: 'Authentication successful', token, data: { user } });
        });
      }
    })(req, res);
  }
};

// logout
userController.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = userController;
