'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
  function($scope, Global) {
    $scope.global = Global;
 
$scope.options = {
  relationship:{
    girlfriend:{name:'Girlfriend', gender:'F'},
    boyfriend:{name:'Boyfriend', gender:'M'},
    wife:{name:'Wife', gender:'F'},
    husband:{name:'Husband', gender:'M'}
  },
  price:{
    price1:{name:'<20', value:'0-20'},
    price2:{name:'20 - 50', value:'21-50'},
    price3:{name:'50 - 200', value:'51-200'},
    price4:{name:'+200', value:'201-10000000'}
  },
  level:{
    low:{name:'normal', value:0},
    medium:{name:'cheesy', value:1},
    high:{name:'very cheesy', value:2},
  }
};
}

]);
