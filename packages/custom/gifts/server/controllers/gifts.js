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
  req.query = {price:{$gt:7}};
  Gift.find(req.query).sort('-created').populate('user', 'name username').exec(function(err, gifts) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the gifts'
      });
    }
    res.json(gifts);
  });
};


exports.show = function(req, res){
  res.json(req.gift);
};

exports.create = function(req, res) {
  var gift = new Gift(req.body);
  gift.user = req.user;
  console.log(gift);
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
