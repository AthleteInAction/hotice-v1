var TeamsNewCtrl = ['$scope','$routeParams','$location','ApiModel','$timeout',
	function($scope,$routeParams,$location,ApiModel,$timeout){

		$scope.current_user = current_user;

		$scope.users = [];
		var t = [
			{gamertag: 'AthleteInAction'},
			{gamertag: 'DafDHunter'},
			{gamertag: 'Octavarium XX'},
			{gamertag: 'DeltaShark96'},
			{gamertag: 'Digs510'},
			{gamertag: 'Finchpoker'}
		];
		// $scope.users = t;

		$scope.submitting = false;

		$scope.team = {
			creator: current_user,
			confirmed: [current_user],
			invited: [current_user],
			admins: [current_user],
			wins: 0,
			losses: 0,
			otl: 0,
			dnf: 0
		};

		$scope.addTeammate = function(item){

			$scope.team.invited.push(item);
			$scope.users.removeWhere('gamertag',item.gamertag);

			$scope.teammateAdder = null;

		};

		$scope.removeTeammate = function(i){

			var item = $scope.team.invited[i];

			$scope.team.invited.splice(i,1);
			$scope.users.push(item);

		};

		$scope.createTeam = function(){

			// $scope.submitting = true;

			var team = angular.copy($scope.team);

			team.creator = makePointer(team.creator);
			team.admins = makeRelation(team.admins);
			team.invited = makeRelation(team.invited);
			team.confirmed = makeRelation(team.confirmed);

			var Team = new ApiModel({team: team});

			Team.$create({type: 'teams'},function(data){

				// window.location = '/dashboard/#/teams/myteams';
				$scope.submitting = false;

			});

		};

		$scope.filterUsers = function(item){



		};

		$scope.getUsers = function(){

			$scope.submitting = true;

			this.options = {
				type: 'users'
			};

			ApiModel.query(this.options,function(data){

				$scope.users = data.body.results;
				$scope.users.removeWhere('objectId',current_user.objectId);

				$scope.submitting = false;

			});

		};
		$scope.getUsers();

	}
];
Array.prototype.removeWhere = function(key,val){
    for (i = 0; i < this.length; i++) {
    	if (this[i][key] == val){
    		this.splice(i,1);
    	}
    }
}