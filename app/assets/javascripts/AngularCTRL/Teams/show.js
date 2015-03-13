var TeamsShowCtrl = ['$scope','$routeParams','$location','ApiModel','$timeout',
	function($scope,$routeParams,$location,ApiModel,$timeout){

		$scope.params = $routeParams;
		$scope.team = {};
		$scope.members = [];
		$scope.i_am_admin = false;

		$scope.getTeam = function(){

			this.options = {
				type: 'teams',
				id: $scope.params.id
			};

			ApiModel.query(this.options,function(data){

				$scope.team = data.body.results[0];
				$scope.members = data.body.results;
				JP(data);

			});

		};
		$scope.getTeam();

	}
];