.post((req, res) => {
  passport.authenticate('local', (req, res) => {
    req.login(user, (err) => {
      if (err) {
        return res.json({
          success: false,
          message: err
        });
      }
      const token = jwt.sign({ userId: user._id, username: user.username }, secretKey.coolThirdPartyApiKey, { expiresIn: '24h' });
      return res.sendStatus(201).json({ success: true, message: 'Authentication successful', token, data: { user } });
    });
})



.post((req, res) => {
  if (!req.body.username) {
    return res.json({
      success: false,
      message: 'Username was not given',
    });
  } else if (!req.body.password) {
    return res.json({
      success: false,
      message: 'Password was not given'
    });
  } else {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.json({
          success: false,
          message: err
        });
      } else if (!user) {
        return res.json({
          success: false,
          message: 'username or password incorrect'
        });
      } else {
        req.login(user, (err) => {
          if (err) {
            return res.json({
              success: false,
              message: err
            });
          }
          const token = jwt.sign({ userId: user._id, username: user.username }, secretKey.coolThirdPartyApiKey, { expiresIn: '24h' });
          return res.sendStatus(201).json({ success: true, message: 'Authentication successful', token, data: { user } });
        });
      }
    })(req, res);
  }
});

passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/~' + req.user.username);
  }



  (err, user) => {
    if (err) {
      return res.json({
        success: false,
        message: err
      });
    }

    if (!user) {
      return res.json({
        success: false,
        message: 'username or password incorrect'
      });
    }

    console.log(user);
    console.log('This is a user');

    req.login(user, (err) => {
      if (err) {
        next(err);
        return res.json({
          success: false,
          message: err
        });
      }
      const token = jwt.sign({ userId: user._id, username: user.username }, secretKey.coolThirdPartyApiKey, { expiresIn: '24h' });
      return res.sendStatus(201).json({ success: true, message: 'Authentication successful', token, data: { user } });
    });
  }

  (req, res, next) => {
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