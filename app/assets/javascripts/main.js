var myApp = angular.module('myApp',[]);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
  	when('/', {
  		templateUrl: '../templates/application.html',
  		controller: 'ExpenseController'
  	})
  	// otherwise({
   //    templateUrl: '../templates/home.html',
   //    controller: 'HomeCtrl'
   //  })
   
   $locationProvider.html5Mode(true);

}])