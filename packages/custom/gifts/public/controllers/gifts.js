'use strict';

/* jshint -W098 */
angular.module('mean.gifts').controller('GiftsController', ['$scope', '$stateParams', '$state', '$rootScope', 'Global', 'Gifts',
  function($scope, $stateParams, $state, $rootScope, Global, Gifts) {
    $scope.global = Global;
    $scope.package = {
      name: 'gifts'
    };

    $scope.submit = function(){

    	$scope.submitted = [$scope.togender];
    };

    $scope.find = function(){
      Gifts.query(function(gifts) {

        $scope.gifts = gifts;
      });
    };

    //finder applies the filter and displays only gifts that match
    $scope.finder = function(){
      //default query values
      var query = {};
      
      //if price range was specified
      if('price' in $scope){
        if($scope.price.indexOf('-') > -1){
          var price = $scope.price.split('-');
          if(price[0]>0){
          //if there is a min price, add it to the query
          query.minprice = price[0];
        }
        if(price[1]<10000000){
          //if there is a max price, add it to the query
          query.maxprice = price[1];
        }
      }
    }

      //if 'to relationship' was specified
      if($scope.togender){
        query.togender = $scope.togender;
      }

      //if 'level' was specified
      if($scope.level){
        query.level = $scope.level;
      }
      Gifts.query(query, function(gifts) {
        console.log(gifts);
        //load the gifts up into the $scope gifts variable
        $scope.gifts = gifts;
        //load a list of id's to feed into the findOne view
        $rootScope.giftIdList = [];
        for(var item in gifts){
          if(gifts[item].hasOwnProperty(_id)){
            $rootScope.giftIdList.push(gifts[item]._id);
          }
        }
        $scope.list = $rootScope.giftIdList;

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
          level: this.level,
          agemin: this.agemin,
          agemax: this.agemax
        });
        gift.$save(function(response) {
          //console.log(gift);
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
