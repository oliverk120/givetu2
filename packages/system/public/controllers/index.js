'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
  function($scope, Global) {
    $scope.global = Global;
 
$scope.options = {
  relationship:[
    {name:'Girlfriend', gender:'F'},
    {name:'Boyfriend', gender:'M'},
    {name:'Wife', gender:'F'},
    {name:'Husband', gender:'M'}
  ],
  price:[
    {name:'<25', value:'0-25'},
    {name:'25+', value:'26-10000'},
    //{name:'+100', value:'101-10000000'}
  ],
  level:[
    {name:'normal', value:0},
    {name:'cheesy', value:1},
    //{name:'very cheesy', value:2},
  ]
};
}

]);
