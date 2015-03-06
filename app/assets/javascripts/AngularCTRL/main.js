var MainCtrl = ['$scope','$routeParams','$location','ApiModel','$timeout',
	function($scope,$routeParams,$location,ApiModel,$timeout){

		zE(function(){
			var zduser = {
				name: current_user['gamertag'],
				email: current_user['email'],
				external_id: current_user['objectId']
			};
			zE.identify(zduser);
		});

		$scope.getUsers = function(complete){

			this.options = {
				type: 'users'
			};

			ApiModel.query(this.options,function(data){

				$scope.users = data.body.results;
				$scope.users.removeWhere('objectId',current_user.objectId);

				complete(data.body.results);

			});

		};
		$scope.getUsers(function(users){
			$scope.users = users;
		});

	}
];