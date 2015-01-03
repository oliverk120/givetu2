'use strict';

angular.module('mean.gifts').config(['$stateProvider',
  function($stateProvider) {
        // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

   $stateProvider
    .state('list gifts', {
      url: '/gifts',
      templateUrl: 'gifts/views/index.html'
    })
    .state('create gifts', {
    	url: '/gifts/create',
    	templateUrl: 'gifts/views/create.html'
    })
    .state('edit gift', {
      url: '/gifts/:giftId/edit',
      templateUrl: 'gifts/views/edit.html',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .state('gift by id', {
      url: '/gifts/:giftId',
      templateUrl: 'gifts/views/view.html',
    });
  }
  ]);
