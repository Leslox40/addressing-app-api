const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/config');

// const auth = require('../controllers/authController');

function router(User) {
  const authRouter = express.Router();

  authRouter.route('/signup')
    .post((req, res) => {
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

        return res.json({
          success: true,
          message: 'Your account has been saved',
          user
        });
      });
    });

  authRouter.route('/signin')
    .post((req, res, next) => {
      if (!req.body.username) {
        return res.json({
          success: false,
          message: 'Username was not given',
        });
      }

      if (!req.body.password) {
        return res.json({
          success: false,
          message: 'Password was not given'
        });
      }

      console.log(req.body);

      return passport.authenticate(
        'local',
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An Error occurred. Unable to Login username or password maybe incorrect');

              return next(error);
            }

            console.log('This is a user');
            console.log(user.username);

            req.login(
              user,
              { session: false },
              async (error) => {
                console.log('Im inside the request body outside scope');

                if (error) {
                  console.log('Im inside the request body error scope');
                  return next(error);
                }

                const body = { _id: user._id, username: user.username };
                console.log(body);

                const token = jwt.sign({ user: body }, secretKey.coolThirdPartyApiKey, { expiresIn: '24h' });

                console.log('jwt token', token);

                return res.json({ success: true, message: 'Authentication successful', token });
              }
            );
          } catch (error) {
            return next(error);
          }
        })(req, res, next);
    });

  authRouter.route('/logout')
    .post((req, res) => {
      req.logout();
      res.redirect('/');
    });

  return authRouter;
}

module.exports = router;
