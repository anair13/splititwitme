myApp.controller('ExpenseController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    if (!$routeParams.code) {
      window.location.replace(
        "https://api.venmo.com/v1/oauth/authorize?client_id=2071&scope=make_payments&response_type=code"
      );
    }

    console.log($routeParams.code)

    $scope.expenses = [];
    $scope.total = 0.0;
    $scope.payers = {};
    $scope.n = 0;

    $scope.addExpense = function() {
      $scope.expenses.push(
        {expense:$scope.expenseText, payer:$scope.payerText, cost:$scope.costText, done:false}
      );
      $scope.total += $scope.costText;
      if (!($scope.payers[$scope.payerText])) {
        $scope.payers[$scope.payerText] = $scope.costText;
        $scope.n += 1;
      } else {
        $scope.payers[$scope.payerText] = $scope.payers[$scope.payerText] + $scope.costText;
      }
      $scope.expenseText = '';
      $scope.payerText  = '';
      $scope.costText = '';
    };

    $scope.addSharer = function() {
      if ($scope.nameText) {
        if (!($scope.payers[$scope.nameText])) {
          $scope.payers[$scope.nameText] = 0;
          $scope.n += 1;
        }
      }
    };

    $scope.getKeys = function() {
      return Object.keys($scope.payers);
    };

    $scope.getTotal = function(name) {
      return $scope.payers[name];
    };

    $scope.postSplit = function() {
      var due = $scope.total / $scope.n;
      console.log($scope.payers);

      var payers = [];
      var balances = [];

      for (var name in $scope.payers) {
        if ($scope.payers.hasOwnProperty(name)) {
          payers.push(name);
          balances.push($scope.payers[name] - due);
        }
      }

      var dataObj = {payees:payers, charges:balances, code:$routeParams.code}
      console.log(dataObj)

      // Simple POST request example (passing data) :
      // data passed in should be a serialized json object
      console.log("submit!");
      $http.post('/splits.json', {data:JSON.stringify(dataObj)}).
        success(function(data, status, headers, config) {
          console.log(data)
        }).
        error(function(data, status, headers, config) {
          console.log(data)
        });
    }

  }
]);