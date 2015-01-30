'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$rootScope', 'Global',
  function($scope, $rootScope, Global) {
    $rootScope.fb_title = 'Home - Givetu Romantic';  
    $rootScope.fb_description = 'Givetu Romantic gives you an easy way to pick out gifts for your boyfriend, girlfriend, husband or wife';  
    $rootScope.fb_image = '/system/assets/img/givetu_LOGO_VALENTINES.png';  
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

$scope.relationship_chosen = {name: 'Giftee'};
$scope.choose_relationship = function(choice){
  $scope.relationship_chosen = choice;
  $scope.togender = choice.gender;
};

$scope.price_chosen = {name: 'Price'};
$scope.choose_price = function(choice){
  $scope.price_chosen = choice;
  $scope.price = choice.value;
};

}
]);

angular.module('mean.system').controller('DropdownCtrl', function ($scope, $log) {
  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
});
