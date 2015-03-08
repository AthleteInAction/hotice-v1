var EventRegistrationCtrl = ['$scope','$routeParams','$location','ApiModel','$timeout',
	function($scope,$routeParams,$location,ApiModel,$timeout){

		$scope.params = $routeParams;

		$scope.myTeams = [];
		$scope.regLoaded = false;

		$scope.getEvent = function(){

			this.options = {
				type: 'events',
				id: $scope.params.id
			}

			ApiModel.query(this.options,function(data){

				JP(data);
				$scope.event = data.body.results[0];
				$scope.event.registered = [];
				$scope.event.confirmed = [];
				$scope.getRegistered();

			});

		};
		$scope.getEvent();

		$scope.getMyTeams = function(){

			this.options = {
				type: 'teams',
				constraints: '{"admins":{"__type":"Pointer","className":"_User","objectId":"'+current_user['objectId']+'"}}'
			};

			ApiModel.query(this.options,function(data){

				$scope.myTeams = data.body.results;

			});

		};
		$scope.getMyTeams();

		$scope.getRegistered = function(){

			this.options = {
				type: 'teams',
				constraints: '{"$relatedTo":{"object":{"__type":"Pointer","className":"Events","objectId":"'+$scope.event.objectId+'"},"key":"registered"}}'
			}

			ApiModel.query(this.options,function(data){

				JP('REGISTERED');
				JP(data);
				$scope.event.registered = data.body.results;
				$scope.regLoaded = true;

			});

		};

		$scope.registerTeam = function(item){

			$scope.teamadder = null;

			this.options = {
				type: 'events',
				id: $scope.params.id
			};

			var eventA = angular.copy($scope.event);

			eventA.registered = {
				__op: 'AddRelation',
				objects: [
					{
						__type: 'Pointer',
						className: 'Teams',
						objectId: item.objectId
					}
				]
			}

			var Register = new ApiModel({event: eventA});

			Register.$save(this.options,function(data){

				JP('REGISTER TEAM:');
				JP(data);
				$scope.event.registered.push(item);

			});

		};

	}
];