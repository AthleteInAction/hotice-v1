var TeamsCtrl = ['$scope','$routeParams','$location','ApiModel','$timeout',
	function($scope,$routeParams,$location,ApiModel,$timeout){

		$scope.params = $routeParams;

		$scope.sort = 'name';
		$scope.rev = false;

		$scope.teams = [];

		$scope.getTeams = function(){

			this.options = {
				type: 'teams'
			};

			ApiModel.query(this.options,function(data){

				$scope.teams = data.body.results;

			});

		};

		$scope.getTeams();

		$scope.teamLink = function(id){

			window.location = '/dashboard/#/teams/'+id

		};

		$scope.teamSort = function(){

			if ($scope.sort == 'name'){
				$scope.rev = false;
			} else {
				$scope.rev = true;
			}

		};

	}
];