const express = require('express');
const authController = require('../controllers/authController');

function router(User) {
  const authRouter = express.Router();
  const auth = authController(User);

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
    .post((req, res) => {
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
              const token = jwt.sign({userId: user._id, username: user.username}, secretKey, { expiresIn: '24h' });

              res.json({ success: true, message: 'Authentication successful', token });
            });
          }
        })
      }
    })
  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });

  return authRouter;
}

module.exports = router;
