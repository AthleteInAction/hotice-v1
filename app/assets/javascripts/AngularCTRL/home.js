var HomeCtrl = ['$scope','$routeParams','$location','ApiModel','$timeout',
	function($scope,$routeParams,$location,ApiModel,$timeout){

		$scope.articles = [];
		
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

	}
];