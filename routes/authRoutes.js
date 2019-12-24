const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      if (process.env.NODE_ENV === 'production') {
        // if(req.user.newuser){
        //   res.redirect('https://financialkeeps.herokuapp.com/new/profile');
        // } else {
          res.redirect('https://financialkeeps.herokuapp.com/dashboard');
        //}
      } else {
        if(req.user.newuser){
          res.redirect('http://localhost:3000/new/profile');
        } else {
          res.redirect('http://localhost:3000/dashboard');
        }
      }
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    if (process.env.NODE_ENV === 'production') {
      res.redirect('https://financialkeeps.herokuapp.com');
    } else {
    res.redirect('http://localhost:3000/');
    }
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};