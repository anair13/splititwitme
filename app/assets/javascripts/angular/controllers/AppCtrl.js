myApp.controller('AppCtrl', ['$scope', function($scope) {

}]);

myApp.controller('ExpenseController', ['$scope', function($scope) {
    $scope.expenses = [];
    payers = {};

 
    $scope.addExpense = function() {
      $scope.expenses.push({expense:$scope.expenseText, payer:$scope.payerText, cost:$scope.costText, done:false});
      if (!(payers[$scope.payerText])) {
        payers[$scope.payerText] = $scope.costText;
      } else {
        payers[$scope.payerText] = payers[$scope.payerText] + $scope.costText;
      }
      $scope.expenseText = '';
      $scope.payerText  = '';
      $scope.costText = '';
    };

    $scope.addSharer = function() {
      if (!(payers[$scope.nameText])) {
        payers[$scope.nameText] = 0;
      $scope.sharerText = '';
    };

    $scope.getKeys = function() {
      return Object.keys(payers);
    };


    $scope.getTotal = function(name) {
      return payers[name];
    };

    $scope.postSplit = function() {
      // Simple POST request example (passing data) :
      // data passed in should be a serialized json object
      $http.post('/splits.json', {data:'hello word!'}).
        success(function(data, status, headers, config) {
          console.log(data)
        }).
        error(function(data, status, headers, config) {
          console.log(data)
        });
    }

    $scope.postSplit();

  }]);