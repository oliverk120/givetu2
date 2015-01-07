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
      $scope.noGift = false;
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
          if(gifts[item].hasOwnProperty('_id')){
            $rootScope.giftIdList.push({id:gifts[item]._id, image:gifts[item].image});
          }
        }
        $scope.list = $rootScope.giftIdList;
        if($rootScope.giftIdList.length>0){
          var first_id = $rootScope.giftIdList[0].id;
          $state.go('gift by id', {giftId:first_id});
        } else {
          $scope.noGift = true;
        }
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
      var current_id = 0;
      //if a search has been done for gifts and a list has been loaded, then this is true
      var gifts_loaded = $rootScope.hasOwnProperty('giftIdList');
      $scope.next_id = 0;
      if($stateParams.giftId.match(/^[0-9a-fA-F]{24}$/)){
        //if a gift id is specified, load that gift
        current_id = $stateParams.giftId;
        //if an id has been specified AND there is a list of gifts loaded, need to determine where in the list we are
        if(gifts_loaded){
          for (var k = 0; k < $rootScope.giftIdList.length; k+=1) {
            if ($rootScope.giftIdList[k].id === current_id) {
              var j = k+1;
              console.log('j:' +j);
              console.log($rootScope.giftIdList);
              console.log($rootScope.giftIdList[j]);
              if($rootScope.giftIdList[j]){
                $scope.next_id = $rootScope.giftIdList[j].id;
                console.log($scope.next_id);
              }
            }
          }
        }else if(gifts_loaded){
        //if no gift id is specified, then go to the first gift in the gift list
        current_id = $rootScope.giftIdList[0].id;
        if($rootScope.giftIdList[1]){
          $scope.next_id = $rootScope.giftIdList[1].id;
        }
      }
      //need to determine what the next gift will be

    }

    Gifts.get({
      giftId: current_id
    }, function(gift) {
      $scope.gift = gift;
    });
  };

}
]);
