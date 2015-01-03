'use strict';

var gifts = require('../controllers/gifts');

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Gifts, app, auth, database) {

  app.route('/gifts')
    .get(gifts.all)
    .post(gifts.create);

  app.route('/gifts/:giftId')
    .get(gifts.show)
    .delete(gifts.destroy);
    
  app.param('giftId', gifts.gift);

};
