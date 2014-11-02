var myApp = angular.module('myApp',[]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
      templateUrl: '../templates/home.html',
      controller: 'HomeCtrl'
    })
}])