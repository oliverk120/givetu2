'use strict';

(function() {
  // Gifts Controller Spec
  describe('MEAN controllers', function() {
    describe('GiftsController', function() {
      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function() {
        jasmine.addMatchers({
          toEqualData: function() {
            return {
              compare: function(actual, expected) {
                return {
                  pass: angular.equals(actual, expected)
                };
              }
            };
          }
        });
      });

      beforeEach(function() {
        module('mean');
        module('mean.system');
        module('mean.gifts');
      });

      // Initialize the controller and a mock scope
      var GiftsController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        GiftsController = $controller('GiftsController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one gift object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('gifts').respond([{
            name: 'An Gift about MEAN',
            description: 'MEAN rocks!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.gifts).toEqualData([{
            name: 'An Gift about MEAN',
            description: 'MEAN rocks!'
          }]);

        });

      it('$scope.findOne() should create an array with one gift object fetched ' +
        'from XHR using a giftId URL parameter', function() {
          // fixture URL parament
          $stateParams.giftId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testGiftData = function() {
            return {
              name: 'An Gift about MEAN',
              description: 'MEAN rocks!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/gifts\/([0-9a-fA-F]{24})$/).respond(testGiftData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.gift).toEqualData(testGiftData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postGiftData = function() {
            return {
              name: 'An Gift about MEAN',
              description: 'MEAN rocks!'
            };
          };

          // fixture expected response data
          var responseGiftData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              name: 'An Gift about MEAN',
              description: 'MEAN rocks!'
            };
          };

          // fixture mock form input values
          scope.name = 'An Gift about MEAN';
          scope.description = 'MEAN rocks!';

          // test post request is sent
          $httpBackend.expectPOST('gifts', postGiftData()).respond(responseGiftData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.name).toEqual('');
          expect(scope.description).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/gifts/' + responseGiftData()._id);
        });

      it('$scope.update(true) should update a valid gift', inject(function(Gifts) {

        // fixture rideshare
        var putGiftData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            name: 'An Gift about MEAN',
            to: 'MEAN is great!'
          };
        };

        // mock gift object from form
        var gift = new Gifts(putGiftData());

        // mock gift in scope
        scope.gift = gift;

        // test PUT happens correctly
        $httpBackend.expectPUT(/gifts\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/gifts\/([0-9a-fA-F]{24})$/, putGiftData()).respond();
        /*
                Error: Expected PUT /gifts\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","name":"An Gift about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","name":"An Gift about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/gifts/' + putGiftData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid giftId ' +
        'and remove the gift from the scope', inject(function(Gifts) {

          // fixture rideshare
          var gift = new Gifts({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.gifts = [];
          scope.gifts.push(gift);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/gifts\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(gift);
          $httpBackend.flush();

          // test after successful delete URL location gifts list
          //expect($location.path()).toBe('/gifts');
          expect(scope.gifts.length).toBe(0);

        }));
    });
  });
}());
