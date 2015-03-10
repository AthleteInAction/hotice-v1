var TeamsShowCtrl = ['$scope','$routeParams','$location','ApiModel','$timeout',
	function($scope,$routeParams,$location,ApiModel,$timeout){

		$scope.params = $routeParams;
		$scope.team = {
			admins: [],
			confirmed: [],
			invited: []
		};
		$scope.i_am_admin = false;

		$scope.getTeam = function(){

			this.options = {
				type: 'teams',
				id: $scope.params.id
			};

			ApiModel.query(this.options,function(data){

				$scope.team = data.body.results[0];
				$scope.getConfirmed();
				$scope.getAdmins();
				$scope.getInvited();

			});

		};
		$scope.getTeam();

		$scope.getConfirmed = function(){

			this.options = {
				type: 'users',
				constraints: '{"$relatedTo":{"object":{"__type":"Pointer","className":"Teams","objectId":"'+$scope.params.id+'"},"key":"confirmed"}}'
			};

			ApiModel.query(this.options,function(data){

				$scope.team.confirmed = data.body.results;

			});

		};
		$scope.getAdmins = function(){

			this.options = {
				type: 'users',
				constraints: '{"$relatedTo":{"object":{"__type":"Pointer","className":"Teams","objectId":"'+$scope.params.id+'"},"key":"admins"}}'
			};

			ApiModel.query(this.options,function(data){

				$scope.team.admins = data.body.results;
				$scope.i_am_admin = $scope.team.admins.contains('objectId',current_user.objectId);

			});

		};
		$scope.getInvited = function(){

			this.options = {
				type: 'users',
				constraints: '{"$relatedTo":{"object":{"__type":"Pointer","className":"Teams","objectId":"'+$scope.params.id+'"},"key":"invited"}}'
			};

			ApiModel.query(this.options,function(data){

				$scope.team.invited = data.body.results;

			});

		};

	}
];