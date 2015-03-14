var EventRegistrationCtrl = ['$scope','$routeParams','$location','ApiModel','$timeout',
	function($scope,$routeParams,$location,ApiModel,$timeout){

		$scope.params = $routeParams;

		$scope.myTeams = [];
		$scope.displayTeams = [];

		$scope.getEvent = function(){

			this.options = {
				type: 'events',
				id: $scope.params.id
			}

			ApiModel.query(this.options,function(data){

				$scope.event = data.body.results[0];

			});

		};
		$scope.getEvent();

		$scope.getMyTeams = function(){

			this.options = {
				type: 'myteams'
			};

			var temp = {};
			var teams = [];

			ApiModel.query(this.options,function(data){

				$.each(data.body.results,function(key,val){

					temp[val.team.objectId] = val.team;

				});

				$.each(temp,function(key,val){

					teams.push(val);

				});

				$scope.myTeams = teams;
				$scope.displayTeams = teams;

			});

		};
		$scope.getMyTeams();

		$scope.filterTeams = function(text){

			var temp = [];

			$.each($scope.myTeams,function(key,val){

				if (val.name.toLowerCase().search(text.toLowerCase()) != -1){

					temp.push(val);

				}

			});

			$scope.displayTeams = temp;

		};

		$scope.registerTeam = function(i){

			var team = $scope.displayTeams[i];
			JP(team);

			this.options = {
				type: 'relations'
			};

			var r = {
				relation: {
					type: 'event',
					team: {
						__type: 'Pointer',
						className: 'Teams',
						objectId: team.objectId
					},
					user: {
						__type: 'Pointer',
						className: '_User',
						objectId: current_user.objectId	
					},
					event: {
						__type: 'Pointer',
						className: 'Events',
						objectId: $scope.params.id
					}
				}
			}

			var Relation = new ApiModel(r);

			Relation.$create(this.options,function(data){

				JP(data);

			});

		};

	}
];