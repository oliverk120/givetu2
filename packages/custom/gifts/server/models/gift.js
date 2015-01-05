'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var GiftSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  amazonid: {
    type: String,
    required: false,
  },
  affiliate: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  togender: {
    type: String,
    required: false,
  },
  agemin: {
    type: Number,
    required: false,
  },
  agemax: {
    type: Number,
    required: false,
  },
  level: {
    type: Number,
    required: false,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
GiftSchema.path('name').validate(function(title) {
  return !!title;
}, 'Name cannot be blank');

/**
 * Statics
 */
GiftSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Gift', GiftSchema);
