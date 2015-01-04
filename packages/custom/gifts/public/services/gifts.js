'use strict';

//Gift service used for articles REST endpoint
angular.module('mean.gifts').factory('Gifts', ['$resource',
	function($resource) {
		return $resource('gifts/:giftId', {
			giftId: '@_id'
		}, {
			query: {
				method:'GET', params:{}, isArray:true},
			update: {
				method: 'PUT'
			}
		});
	}
	]);