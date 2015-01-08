'use strict';

var gifts = require('../controllers/gifts');

// Gift authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.gift.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Gifts, app, auth, database) {

  app.route('/gifts')
    .get(gifts.all)
    .post(auth.requiresLogin, gifts.create);

  app.route('/gifts/:giftId')
    .get(auth.isMongoId, gifts.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, gifts.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, gifts.destroy);

    //TESTING//
  app.route('/upload/images')
    .post(gifts.uploadImage);

  app.param('giftId', gifts.gift);

};
