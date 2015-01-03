'use strict';

/* jshint -W098 */
angular.module('mean.gifts').controller('GiftsController', ['$scope', 'Global', 'Gifts',
  function($scope, Global, Gifts) {
    $scope.global = Global;
    $scope.package = {
      name: 'gifts'
    };
  }
]);
