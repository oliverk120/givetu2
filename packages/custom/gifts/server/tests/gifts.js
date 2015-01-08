/* jshint -W079 */ 
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
 var expect = require('expect.js'),
	mongoose = require('mongoose'),
  	User = mongoose.model('User'),
  	Gift = mongoose.model('Gift');
/**
 * Globals
 */
var user;
var gift;

describe('<Unit Test>', function() {
  describe('Model Gift:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        gift = new Gift({
          name: 'Gift Name',
          image: 'Gift Image',
          description: 'Description',
          price: 5,
          amazonid: 'amazonid',
          affiliate: 'givetu-20',
          togender: 'M',
          torelationship: 1,
          level: 1,
          agemin: 0,
          agemax: 80,
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return gift.save(function(err) {
          expect(err).to.be(null);
          expect(gift.name).to.equal('Gift Name');
          expect(gift.image).to.equal('Gift Image');
          expect(gift.description).to.equal('Description');
          expect(gift.price).to.equal(5);
          expect(gift.amazonid).to.equal('amazonid');
          expect(gift.affiliate).to.equal('givetu-20');
          expect(gift.togender).to.equal('M');
          expect(gift.torelationship).to.equal('1');
          expect(gift.agemin).to.equal(0);
          expect(gift.agemax).to.equal(80);
          expect(gift.user.length).to.not.equal(0);
          expect(gift.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without name', function(done) {
        gift.name = '';

        return gift.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        gift.user = {};

        return gift.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

    });

    afterEach(function(done) {
      gift.remove(function () {
        user.remove();
      });
      done();
    });
  });
});