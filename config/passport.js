const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../models/userModel');

function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // store user in session
  passport.serializeUser(User.serializeUser());

  // retrieve user in session
  passport.deserializeUser(User.deserializeUser());

  // Implementing local Strategy
  passport.use(new Strategy(User.authenticate));
}

module.exports = passportConfig;
