var TeamsCtrl = ['$scope','$routeParams','$location','ApiModel','$timeout',
	function($scope,$routeParams,$location,ApiModel,$timeout){

		$scope.params = $routeParams;

		$scope.my = false;
		if ($location.path() == '/myteams'){$scope.my = true;}

		$scope.teams = {};

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

	}
];