myApp.controller('ExpenseController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    if (!$routeParams.code) {
       window.location.replace(
         "https://api.venmo.com/v1/oauth/authorize?client_id=2071&scope=make_payments&response_type=code&redirect_uri=http://splitwit.me/app"
       );
    }

    console.log($routeParams.code)

    expenses = [];
    $scope.expenses = [];
    total = 0.0;
    $scope.total = 0.0;
    payers = {};
    $scope.payers = {};
    n = 0;
    $scope.n = 0;

    $scope.addExpense = function() {
      console.log("hi~:")
      $scope.expenses.push(
        {expense:$scope.expenseText, payer:$scope.payerText, cost:parseFloat($scope.costText), done:false}
      );
      expenses.push(
        {expense:$scope.expenseText, payer:$scope.payerText, cost:parseFloat($scope.costText), done:false}
      );
      $scope.total += parseFloat($scope.costText);
      total += parseFloat($scope.costText);
      if (!(payers[$scope.payerText])) {
        $scope.payers[$scope.payerText] = parseFloat($scope.costText);
        $scope.n += 1;
        payers[$scope.payerText] = parseFloat($scope.costText);
        n += 1;
      } else {
        $scope.payers[$scope.payerText] = $scope.payers[$scope.payerText] + parseFloat($scope.costText);
        payers[$scope.payerText] = payers[$scope.payerText] + parseFloat($scope.costText);
      }
      $scope.expenseText = '';
      $scope.payerText  = '';
      $scope.costText = '';
      console.log(expenses);
      console.log(Object.keys(payers));
    };


    $scope.addSharer = function() {
      if ($scope.nameText) {
        if (!(payers[$scope.nameText])) {
          $scope.payers[$scope.nameText] = 0;
          payers[$scope.nameText] = 0;
          $scope.n += 1;
          n += 1;
        }
      }
    };

    $scope.getKeys = function() {
      return Object.keys(payers);
    };

    $scope.getTotal = function(name) {
      return payers[name];
    };

    $scope.postSplit = function() {
      var due = total / n;
      console.log($scope.payers);

      var payees = [];
      var balances = [];

      for (var name in payers) {
        if (payers.hasOwnProperty(name)) {
          payees.push(name);
          balances.push(payers[name] - due);
        }
      }

      var dataObj = {payees:payees, charges:balances, code:$routeParams.code}
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

    console.log("done initializing")

  }
]);
