'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Gifts, app, auth, database) {

  app.get('/gifts/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/gifts/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/gifts/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/gifts/example/render', function(req, res, next) {
    Gifts.render('index', {
      package: 'gifts'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
