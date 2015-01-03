'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
  function($scope, Global) {
    $scope.global = Global;
 
$scope.options = {
  relationship:{
    girlfriend:{name:'Girlfriend'},
    boyfriend:{name:'Boyfriend'},
    wife:{name:'Wife'},
    husband:{name:'Husband'}
  },
  price:{
    price1:{name:'<20'},
    price2:{name:'20 - 50'},
    price3:{name:'50 - 200'},
    price4:{name:'+200'}
  },
  level:{
    low:{name:'normal'},
    medium:{name:'cheesy'},
    high:{name:'very cheesy'},
  }
};
}

]);
