const passport = require('passport');
const { Strategy } = require('passport-local');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');
const secretKey = require('./config');

function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // store user in session
  passport.serializeUser(User.serializeUser());

  // retrieve user in session
  passport.deserializeUser(User.deserializeUser());

  // Implementing local Strategy
  passport.use(new Strategy(User.authenticate()));

  passport.use(
    new JWTstrategy(
      {
        secretOrKey: 'TOP SECRET',
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
}

module.exports = passportConfig;
