var HomeCtrl = ['$scope','$routeParams','$location','ApiModel','$timeout',
	function($scope,$routeParams,$location,ApiModel,$timeout){

		$scope.articles = [];
		$scope.events = [];
		
		$scope.getArticles = function(){

			this.options = {
				type: 'nhl',
				second: 'headlines'
			};

			ApiModel.query(this.options,function(data){

				$scope.articles = data.rss.channel.item;

			});

		};
		$scope.getArticles();

		$scope.getEvents = function(){

			this.options = {
				type: 'events'
			};

			ApiModel.query(this.options,function(data){
				
				$scope.events = data.body.results;

			});

		};
		$scope.getEvents();

	}
];