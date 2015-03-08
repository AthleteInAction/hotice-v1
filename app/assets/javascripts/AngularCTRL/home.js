var HomeCtrl = ['$scope','$routeParams','$location','ApiModel','$timeout',
	function($scope,$routeParams,$location,ApiModel,$timeout){

		var max = 7;
		var o = 0;
		var n = 0;
		$scope.scores = [];

		$scope.getScores = function(){

			this.options = {
				type: 'nhl',
				second: 'scores'
			};

			ApiModel.query(this.options,function(data){

				$scope.scores = data.scores;

				n = 7 - data.scores.length;

				for (i = 0; i < n; i++) {
					
					$scope.scores.push({});

				}

				$scope.scoreScroll(0);

			});

		};
		$scope.getScores();

		$scope.scoreScroll = function(offset){

			$scope.displayScores = [];

			if ((o+offset) <= 3){
				o += offset
			}
			if (o < 0){o = 0;}

			for (i = 0; i < 7; i++) {

				$scope.displayScores.push($scope.scores[i+o]);

			}

		};

	}
];