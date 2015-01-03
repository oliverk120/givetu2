'use strict';

angular.module('mean.gifts').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('gifts example page', {
      url: '/gifts/example',
      templateUrl: 'gifts/views/index.html'
    });
  }
]);
