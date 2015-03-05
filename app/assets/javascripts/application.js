// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require AngularJS/angular
//= require AngularJS/angular-resource
//= require AngularJS/angular-ui
//= require AngularJS/angular-route
//= require_directory ./AngularCTRL
//= require_tree .
var HotIce;
HotIce = angular.module('HotIce',['ngRoute','ngResource','ui']);
HotIce.value('$anchorScroll',angular.noop);
HotIce.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	
	html5Mode: true;

	$routeProvider.when('/home',{
		templateUrl : '/angularjs/templates/home.html',
		controller: HomeCtrl
	}).when('/teams/new',{
		templateUrl : '/angularjs/templates/teams_new.html',
		controller: TeamsNewCtrl
	}).when('/teams',{
		templateUrl : '/angularjs/templates/teams.html',
		controller: TeamsCtrl
	}).when('/myteams',{
		templateUrl : '/angularjs/templates/teams.html',
		controller: TeamsCtrl
	}).otherwise({
		redirectTo: '/home'
	});
	
}]);


// Events Model
// -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
// -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
HotIce.factory('ApiModel',[
	'$resource',function($resource){
		return $resource("/api/v1/:type/:id/:extend/:second.json",
			{
				id: '@id',
				extend: '@extend',
				second: '@second'
			},
			{
				get: {method: 'GET'},
				query: {method: 'GET'},
				create: {method: 'POST'},
				save: {method: 'PUT'},
				destroy: {method: 'DELETE'}
			}
		);
	}
]);
HotIce.config(['$httpProvider',function($httpProvider){
		$httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
	}
]);
// -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
// -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:

HotIce.directive('myDirective',function(){
	return {
		restrict: 'A',
		scope: {
			myCallback: '&'
		},
		link: function(scope,element,attrs){

			element.bind('keyup',function(){

				scope.$evalAsync(function(){
					scope.myCallback({item: 'test'});
				});

			});
		}
	}
});


// jQuery Datepicker
// -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
// -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
HotIce.directive('wamblAutocomplete',['$compile',function($compile){
    return {
    	restrict: 'A',
    	scope: {
    		wamblAutocomplete: '=',
    		wamblOnSelect: '&',
    		wamblOnClick: '&'
    	},
    	require: 'ngModel',
        link: function(scope,element,attrs,ngModel){

        	var template = '<div class="autocomplete"><ul><li ng:repeat="item in wamblItems track by $index"><a href="" ng:class="{selected: $index==wamblIndex}" ng:click="clickHandle($index)">{{translate(item)}}</a></li></ul></div>';
        	var el = angular.element(template);
        	compiled = $compile(el);
        	element.after(el);
        	compiled(scope);
	
        	var selectedIndex = -1;
        	var prevLength = 0;
	
        	var w,l,r,lr,rr;
        	var filtered = [];

        	// Input Bottom Left Radius
        	lr = parseInt(element.css('border-bottom-left-radius'));
        	// Input Bottom Right Radius
        	rr = parseInt(element.css('border-bottom-right-radius'));

        	scope.translate = function(item){

        		return item[attrs.wamblDisplayAttr];

        	};

        	scope.doSize = function(){

        		// Input Width
        		w = parseInt(element.css('width'));
        		// List Left Border Width
        		l = parseInt(element.next().find('ul').css('border-left-width'));
        		// List Right Border Width
        		r = parseInt(element.next().find('ul').css('border-right-width'));

        		var f = parseInt(element.css('font-size'));

        		element.next().css('width',(w-l-r)+'px').css('font-size',(f)+'px').hide();

        	};
        	scope.doSize();

        	scope.hideList = function(){

        		element.next().hide();
        		element.css('border-bottom-right-radius',lr+'px');
        		element.css('border-bottom-left-radius',rr+'px');

        	};
        	scope.showList = function(){

        		element.next().show();
        		element.css('border-bottom-right-radius','0px');
        		element.css('border-bottom-left-radius','0px');

        	};

        	element.bind('focus',function(event){

        		scope.doSize();
        		scope.filter();
        		if (filtered.length > 0){scope.showList();}

        	});

        	element.bind('blur',function(event){

        		selectedIndex = -1;

        		scope.filter();

        		setTimeout(function(){
        			scope.hideList()
        		},50);

        	});
            
        	element.bind('keyup',function(event){

        		scope.doSize();
	
            	scope.filter();

            	var maxIndex = scope.wamblItems.length-1;
	
        		if (event.which == 38 && scope.wamblItems.length > 0){
	
        			if (selectedIndex >= 0){selectedIndex--;}
	
        		} else if (event.which == 40 && scope.wamblItems.length > 0){
	
        			if (selectedIndex < maxIndex){selectedIndex++;}
	
        		}
	
        		if (event.which == 38){
	
					element.val(element.val());
	
        		} else if (event.which == 40){
	
        			element.val(element.val());
	
        		}
	
        		if (event.which == 13 && selectedIndex >= 0){

        			var d = scope.translate(scope.wamblItems[selectedIndex]);

        			element.val(d);
        			
        			scope.hideList();
	
        			scope.wamblOnSelect({item: scope.wamblItems[selectedIndex]});

        			scope.wamblItems = [scope.wamblItems[selectedIndex]];

        			selectedIndex = -1;
	
        		}

        		scope.wamblIndex = selectedIndex;
        		scope.$apply(function(){
            		scope.wamblIndex = selectedIndex;
            	});

        	});

			scope.filter = function(){

				var tval = element.val();

				if (tval.length != prevLength){
            		selectedIndex = -1;
            		prevLength = tval.length;
            	}
	
            	filtered = [];
	
            	if (tval.length > 0){
				
            		scope.showList();

            		$.each(scope.wamblAutocomplete,function(key,val){
	
            			if (val[attrs.wamblDisplayAttr].toLowerCase().search(tval.toLowerCase().toString()) != -1){
            				
            				filtered.push(val);
	
            			}
	
            		});
	
            	} else {
            		
            		scope.hideList();
	
            	}

            	scope.wamblItems = filtered;
            	scope.$apply(function(){
            		scope.wamblItems = filtered;
            	});

            	if (filtered.length == 0){
            		scope.hideList();
            	} else {
            		scope.showList();
            	}

			};

			scope.clickHandle = function(i){

				var d = scope.translate(scope.wamblItems[i]);

				element.val(d);

				scope.hideList();

				scope.wamblOnClick({item: scope.wamblItems[i]});

				scope.wamblItems = [scope.wamblItems[i]];

				selectedIndex = -1;

			};

        }
    }
}]);


HotIce.directive('datepicker',function(){
	return {
		restrict: "A",
		require: "ngModel",
		link: function(scope,elem,attrs,ngModelCtrl){
			var updateModel = function(dateText){
				scope.$apply(function(){
					ngModelCtrl.$setViewValue(dateText);
				});
			};
			var options = {
				dateFormat: 'yy-mm-dd',
				onSelect: function (dateText) {
					updateModel(dateText);
				}
			};
			elem.datepicker(options);
		}
	}
});
HotIce.directive('shiftsubmit',function(){
	return {

		link: function(scope,element){

			$(element).keyup(function(e){

				if (e.keyCode == 13 && e.shiftKey){
					$(element).submit();
				}

			});

		}

	}
});
HotIce.directive('onenter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {

            if(event.which === 13 && !event.shiftKey) {
                scope.$apply(function (){
                    scope.$eval(attrs.onenter);
                });

                event.preventDefault();
            }
        });
    };
});
HotIce.directive('notblank',function(){
    return function(scope,element,attrs){

    	var item = {};
    	$.grep(attrs.ngModel.split('.'),function(val){

    		

    	});

    };
});
HotIce.directive('onstop',function(){
    return function (scope, element, attrs) {
        element.bind('keyup', function (event) {

        	if (attrs.delay){
        		this.delay = attrs.delay;
        	} else {
        		this.delay = 1000;
        	}

        	if (this.timer){clearTimeout(this.timer);}
        	
        	this.timer = setTimeout(function(){scope.$eval(attrs.onstop);},this.delay);

        });
    };
});
HotIce.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});

HotIce.directive("scrollTo", ["$window",function($window){
	return {
	  restrict : "AC",
	  compile : function(){

	    var document = $window.document;
	    
	    function scrollInto(idOrName) {//find element with the give id of name and scroll to the first element it finds
	      if(!idOrName)
	        $window.scrollTo(0, 0);
	      //check if an element can be found with id attribute
	      var el = document.getElementById(idOrName);
	      if(!el) {//check if an element can be found with name attribute if there is no such id
	        el = document.getElementsByName(idOrName);

	        if(el && el.length)
	          el = el[0];
	        else
	          el = null;
	      }

	      if(el) //if an element is found, scroll to the element
	        el.scrollIntoView();
	      //otherwise, ignore
	    }

	    return function(scope, element, attr) {
	      element.bind("click", function(event){
	        scrollInto(attr.scrollTo);
	      });
	    };
	  }
	};
}]);
// -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
// -:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:

function JP(data){

	console.log(data);

}
function dateDiff(a,b){

	var start = moment(b);
	var end = moment(a);
	
	return (start.diff(end,'days')+1);

}
function days_between(date1,date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY)

}

var emailValidate = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var months = [
	{
		number: 0,
		short: 'Jan',
		long: 'January'
	},
	{
		number: 1,
		short: 'Feb',
		long: 'Febuary'
	},
	{
		number: 2,
		short: 'Mar',
		long: 'March'
	},
	{
		number: 3,
		short: 'Apr',
		long: 'April'
	},
	{
		number: 4,
		short: 'May',
		long: 'May'
	},
	{
		number: 5,
		short: 'Jun',
		long: 'June'
	},
	{
		number: 6,
		short: 'Jul',
		long: 'July'
	},
	{
		number: 7,
		short: 'Aug',
		long: 'August'
	},
	{
		number: 8,
		short: 'Sept',
		long: 'September'
	},
	{
		number: 9,
		short: 'Oct',
		long: 'October'
	},
	{
		number: 10,
		short: 'Nov',
		long: 'November'
	},
	{
		number: 11,
		short: 'Dec',
		long: 'December'
	}
];
var days = [
	{
		short: 'Sun',
		long: 'Sunday'
	},
	{
		short: 'Mon',
		long: 'Monday'
	},
	{
		short: 'Tues',
		long: 'Tuesday'
	},
	{
		short: 'Wed',
		long: 'Wednesday'
	},
	{
		short: 'Thurs',
		long: 'Thursday'
	},
	{
		short: 'Fri',
		long: 'Friday'
	},
	{
		short: 'Sat',
		long: 'Saturday'
	}
];

function setCookie(cname,cvalue,exdays)
{
var d = new Date();
d.setTime(d.getTime()+(exdays*24*60*60*1000));
var expires = "expires="+d.toGMTString();
document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname)
{
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++) 
  {
  var c = ca[i].trim();
  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
return "";
}


var pop = function(url,width,height){

	var w = window.innerWidth;
	var h = window.innerHeight;

	var l = ((w/2)-(width/2))+window.screenX;
	var t = ((h/2)-(height/2))+window.screenY;
	t = (window.screen.height/2)-(height/2);

	window.open(url,'_blank','height='+height+',width='+width+',left='+l+',top='+t);

	return false;

};



// OOOOOOOOOOOOO
var makeRelation = function(data){

	var temp = {
		__op: 'AddRelation',
		objects: []
	};

	$.each(data,function(key,val){

		var r = {
			__type: 'Pointer',
			className: '_User',
			objectId: val.objectId
		};

		temp.objects.push(r);

	});

	return temp;

};
var makePointer = function(data){

	var temp = {
		__type: 'Pointer',
		className: '_User',
		objectId: data.objectId
	};

	return temp;

};