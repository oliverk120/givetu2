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
      templateUrl: 'gifts/views/index.html',
      title: 'All Gifts - Givetu Romantic'
    })
    .state('finder gifts', {
      url: '/gifts/finder',
      templateUrl: 'gifts/views/finder.html'
    })
    .state('create gifts', {
    	url: '/gifts/create',
    	templateUrl: 'gifts/views/create.html',
      title: 'Create Gift - Givetu Romantic'
    })
    .state('edit gift', {
      url: '/gifts/:giftId/edit',
      templateUrl: 'gifts/views/edit.html',
      resolve: {
        loggedin: checkLoggedin
      },
      title: 'Edit Gift - Givetu Romantic'
    })
    .state('gift by id', {
      url: '/gifts/:giftId',
      templateUrl: 'gifts/views/view.html',
    });
  }
  ]);
