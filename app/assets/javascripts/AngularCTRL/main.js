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


		$scope.getNotifications = function(complete){

			JP('NOTIFICATIONS: '+new Date());

			this.options = {
				type: 'notifications'
			};

			ApiModel.query(this.options,function(data){

				complete(data.body.results);

			});

		};
		$scope.getNotifications(function(notifications){
			$scope.notifications = notifications;
		});


		$scope.handleNotification = function(notification,accepted){

			JP(notification);
			JP(accepted)

		};

		$scope.getOnlineUsers = function(){

			JP('ONLINE USERS: '+new Date());

			this.options = {
				type: 'online'
			};

			ApiModel.query(this.options,function(data){
				
				$scope.onlineUsers = data.results

			});

		};
		$scope.getOnlineUsers();

		setInterval(function(){

			$scope.getNotifications(function(notifications){
				$scope.notifications = notifications;
			});
			$scope.getOnlineUsers();

		},20000);

		$scope.linkTo = function(loc){

			window.location = loc;

		};

		$scope.displayDate = function(d){

			var date = new Date(d);

			var obj = {}

			obj.sDate = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();

			return obj;

		};

	}
];