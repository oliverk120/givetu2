'use strict';

var mongoose = require('mongoose'),
  Gift = mongoose.model('Gift'),
  _ = require('lodash');

exports.gift = function(req, res, next, id) {
 	Gift.load(id, function(err, gift) {
    if (err) return next(err);
    if (!gift) return next(new Error('Failed to load gift ' + id));
    req.gift = gift;
    console.log(req.gift);
    next();
  });
};

exports.all = function(req, res) {
  //console.log(req);
  var query = {}; 
  var minprice = 0;
  var maxprice = 10000000; 
  //if a level was specified, add it to the query
  if('level' in req.query){
    query.level = req.query.level;
  }

  //if a 'to relationship' was specified, add it to the query
  if('togender' in req.query){
    query.togender = {$in: [req.query.togender, '']};
  }

  if('minprice' in req.query){
  //if a minprice is set, replace placeholder
    minprice = req.query.minprice;
  }

  if('maxprice' in req.query){
  //if a maxprice is set, replace placeholder
    maxprice = req.query.maxprice;
  }
  console.log(query);
  query.price = {$gt: minprice, $lt: maxprice};

  /*TESTING the query*/
  //query = {price: {$lt: 20}};

  Gift.find(query).sort('-created').populate('user', 'name username').exec(function(err, gifts) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the gifts'
      });
    }
    console.log(gifts);
    res.json(gifts);
  });
};


exports.show = function(req, res){
  res.json(req.gift);
};

exports.create = function(req, res) {
  var gift = new Gift(req.body);
  gift.user = req.user;
  gift.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the gift'
      });
    }
    res.json(gift);

  });
};

exports.update = function(req, res) {
  var gift = req.gift;

  gift = _.extend(gift, req.body);

  gift.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the gift'
      });
    }
    res.json(gift);

  });
};

exports.destroy = function(req, res) {
  var gift = req.gift;
  gift.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the gift'
      });
    }
    //res.json(gift);
  });

};

  exports.uploadImage = function(req, res){
    var cloudinary = require('cloudinary');
    cloudinary.config({ 
      cloud_name: 'givetu', 
      api_key: '737727532997214', 
      api_secret: 'ku8wxmSkffr-gGw6H4yd5ittSe0' 
    });

    cloudinary.uploader.upload(req.body.url, function(result) { 
      res.json(result);
      console.log(result); 
    }, { 
      transformation: { width: 600, height: 1000, crop: 'limit' }, 
      eager: { width: 450, crop: 'scale' }
    });
  };