var myApp = angular.module('myApp',[]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	when('/', {
  		templateUrl: '../templates/application.html',
  		controller: 'ExpenseController'
  	})
  	// otherwise({
   //    templateUrl: '../templates/home.html',
   //    controller: 'HomeCtrl'
   //  })
}])