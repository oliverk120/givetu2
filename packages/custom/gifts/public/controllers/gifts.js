'use strict';

/* jshint -W098 */
angular.module('mean.gifts').controller('GiftsController', ['$scope', '$stateParams', '$state','Global', 'Gifts',
  function($scope, $stateParams, $state, Global, Gifts) {
    $scope.global = Global;
    $scope.package = {
      name: 'gifts'
    };

    $scope.submit = function(){

    	$scope.submitted = [$scope.torelationship];
    };

    $scope.find = function(){
      Gifts.query(function(gifts) {
        
        $scope.gifts = gifts;
      });
    };

    //finder applies the filter and displays only gifts that match
    $scope.finder = function(){
      
      var query = {
        minprice:8
      };

      Gifts.query(query, function(gifts) {
        
        $scope.gifts = gifts;
      });
      $state.go('finder gifts');
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

    $scope.update = function(isValid) {
      if (isValid) {
        var gift = $scope.gift;
        if (!gift.updated) {
          gift.updated = [];
        }
        gift.updated.push(new Date().getTime());

        gift.$update(function() {
          //$location.path('gifts/' + gift._id);
        });
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