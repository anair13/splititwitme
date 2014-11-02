myApp.controller('AppCtrl', ['$scope', function($scope) {

}]);

myApp.controller('ExpenseController', ['$scope', function($scope) {
    $scope.expenses = [
      {text:'learn angular', done:true},
      {text:'build an angular app', done:false}];
 
    $scope.addExpense = function() {
      $scope.expenses.push({text:$scope.expenseText, text:$scope.payerText, text:$scope.costText, done:false});
      $scope.expenseText = '';
      $scope.payerText  = '';
      $scope.costText = '';
    };
 
    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.expenses, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    $scope.archive = function() {
      var oldTodos = $scope.expenses;
      $scope.expenses = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) $scope.expenses.push(todo);
      });
    };
  }]);