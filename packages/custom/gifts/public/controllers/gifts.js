'use strict';

/* jshint -W098 */
angular.module('mean.gifts').controller('GiftsController', ['$scope', '$stateParams','Global', 'Gifts',
  function($scope, $stateParams, Global, Gifts) {
    $scope.global = Global;
    $scope.package = {
      name: 'gifts'
    };

    $scope.submit = function(){
    	$scope.submitted = true;
    };

    $scope.find = function(){

      Gifts.query(function(gifts) {
        
        $scope.gifts = gifts;
      });
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var gift = new Gifts({ 
          name: this.name,
          image: this.image,
          description: this.description,
          price: this.price,
          amazonid: this.amazonid,
          affiliate: 'givetu-20',
          togender: this.togender,
          agemin: this.agemin,
          agemax: this.agemax
        });
        gift.$save(function(response) {
          console.log(gift);
        });
        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(gift) {

      if (gift) {

        gift.$remove();

        for (var i in $scope.gifts) {
          if ($scope.gifts[i] === gift) {
            $scope.gifts.splice(i, 1);
          }
        }
      } else {
        $scope.gift.$remove(function(response) {
          //$location.path('gifts');
        });
      }
    };

    $scope.findOne = function() {
      Gifts.get({
        giftId: $stateParams.giftId
      }, function(gift) {
        $scope.gift = gift;
      });
    };

  }
  ]);
