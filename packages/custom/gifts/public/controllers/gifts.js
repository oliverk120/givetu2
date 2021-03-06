'use strict';

/* jshint -W098 */
angular.module('mean.gifts').controller('GiftsController', ['$scope', '$state', '$stateParams', '$location', '$rootScope', 'Global', 'Gifts', 'Images',
  function($scope, $state, $stateParams, $location, $rootScope, Global, Gifts, Images) {

    var amazon_base_link = 'http://www.amazon.com/dp/';

    //if a title has been set by the state provider, then use that
    if($state.current.hasOwnProperty('title')){
      $rootScope.fb_title = $state.current.title;  
    }
    //set image to be shown on facebook
    $rootScope.fb_image = '/system/assets/img/givetu_LOGO_VALENTINES.png';
    $rootScope.fb_description = 'Givetu Romantic gives you an easy way to pick out gifts for your boyfriend, girlfriend, husband or wife';

    $scope.global = Global;
    $scope.package = {
      name: 'gifts'
    };

    $scope.find = function(){
      Gifts.query(function(gifts) {
        $scope.gifts = gifts;
      });
    };

    $scope.categorize = function(priceRange){
      var query = {};
      var price = [];
      var gift_obj = {};
      var gender = ['M','F'];
      var assign_gifts =  function(){
        return function(gifts) {
          //console.log(gifts.length);
        };
      };

      for(var i = 0; i<priceRange.length; i+=1){

        for(var j = 0; j<gender.length; j+=1){
              
          //console.log(priceRange[i].value);
          price = priceRange[i].value.split('-'); 
          if(price[0]>0){
              //if there is a min price, add it to the query
              query.minprice = price[0];
            }
          query.maxprice = price[1];
          query.togender = gender[j];
          //console.log(price, gender[j] + ':');
          Gifts.query(query, assign_gifts());
        }
      }
      $scope.gifts = gift_obj;

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
      //if 'to gender' was specified
      if($scope.togender){
        query.togender = $scope.togender;
      }
      //if 'to relationship' was specified
      if($scope.torelationship){
        query.torelationship = $scope.torelationship;
      }
      //if 'level' was specified
      if($scope.level){
        query.level = $scope.level;
      }
      Gifts.query(query, function(gifts) {
        //console.log(gifts);
        //load the gifts up into the $scope gifts variable
        $scope.gifts = gifts;
        //load a list of id's to feed into the findOne view
        var giftIdList = [];
        for(var item in gifts){
          if(gifts[item].hasOwnProperty('_id')){
            giftIdList.push({id:gifts[item]._id, image:gifts[item].image});
          }
        }
        $rootScope.giftIdList = shuffle(giftIdList);
        if($rootScope.giftIdList.length>0){
          var first_id = $rootScope.giftIdList[0].id;
          $location.path('gifts/' + first_id);
        } else {
          $scope.noGift = true;
        }
      });
    };

    $scope.create = function(isValid) {
      if (isValid) {
        //base setting for affiliate
        var affiliate = 'givetu2-20';
        if(this.affiliate){
          affiliate = this.affiliate;
        }
        var gift = new Gifts({ 
          name: this.name,
          image: this.image,
          description: this.description,
          price: this.price,
          amazonid: this.amazonid,
          link: this.link,
          source: this.source,
          affiliate: affiliate,
          togender: this.togender,
          torelationship: this.torelationship,
          level: this.level,
          agemin: this.agemin,
          agemax: this.agemax
        });
        gift.$save(function(response) {
          $location.path('gifts/' + response._id);
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
          $location.path('gifts/' + gift._id);
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
        //console.log($scope.gift);
        $scope.gift.$remove(function(response) {
          $location.path('gifts');
        });
      }
    };

    $scope.findOne = function() {
      var current_id = 0;
      //if a search has been done for gifts and a list has been loaded, then this is true
      var gifts_loaded = $rootScope.hasOwnProperty('giftIdList');
      $scope.next_id = 0;
      $scope.next_image = false;
      if($stateParams.giftId.match(/^[0-9a-fA-F]{24}$/)){
        //if a gift id is specified, load that gift
        current_id = $stateParams.giftId;
        //if an id has been specified AND there is a list of gifts loaded, need to determine where in the list we are
        if(gifts_loaded){
          for (var k = 0; k < $rootScope.giftIdList.length; k+=1) {
            if ($rootScope.giftIdList[k].id === current_id) {
              var j = k+1;
              if($rootScope.giftIdList[j]){
                $scope.next_id = $rootScope.giftIdList[j].id;
                $scope.next_image = $rootScope.giftIdList[j].image;
                preload($scope.next_image);
              }
            }
          }
        }else if(gifts_loaded){
        //if no gift id is specified, then go to the first gift in the gift list
        current_id = $rootScope.giftIdList[0].id;
        if($rootScope.giftIdList[1]){
          $scope.next_id = $rootScope.giftIdList[1].id;
          $scope.next_image = $rootScope.giftIdList[1].image;
        }
      }
      //need to determine what the next gift will be

    }

    Gifts.get({
      giftId: current_id
    }, function(gift) {
      if('amazonid' in gift){
        if('affiliate' in gift){
          gift.link = amazon_base_link + gift.amazonid + '/?tag=' + gift.affiliate;
        } 
      }
      if('source' in gift){
        var url_split = gift.source.split('/');
        gift.source_title = url_split[2];
      }
      $scope.gift = gift;
      //if a gift is retreived, set title and image to reflect the gift
      $rootScope.fb_title = gift.name+' - Givetu';  
      $rootScope.fb_image = gift.image;  
      $rootScope.fb_description = gift.description;
      //console.log($rootScope);
    });

  };

  $scope.upload = function(){
    Images.upload({url:this.url}, function(result){
      //console.log(result);
      $scope.image = result.eager[0].url;
      $scope.uploaded = true;
    });    
  };

  //Non-scope functions
  function preload(src) 
  {
    var preloadedImage = new Image(); 
    preloadedImage.src = src;
  }

    function shuffle(o){ //v1.0
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

  }
  ]);
