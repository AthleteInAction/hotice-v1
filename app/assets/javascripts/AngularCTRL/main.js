var MainCtrl = ['$scope','$routeParams','$location','ApiModel','$timeout',
	function($scope,$routeParams,$location,ApiModel,$timeout){

		zE(function(){
			zE.identify({name: current_user['gamertag'],email: current_user['email'],external_id: current_user['objectId']});
		});

	}
];