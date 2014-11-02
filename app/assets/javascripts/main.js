var myApp = angular.module('myApp',[]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	when('/application', {
  		templateUrl: '../templates/application.html',
  		controller: 'AppCtrl'
  	}).
  	otherwise({
      templateUrl: '../templates/home.html',
      controller: 'HomeCtrl'
    })
}])