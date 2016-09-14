app.controller('productListCtrl',['$scope', '$http', function($scope, $http) {
  $scope.page = 0;
  $scope.items = [];
  $scope.fetching = false;
  $scope.loader = false;
  // Fetch more items
  $scope.getMore = function() {
    $scope.page++;
    $scope.loader = true;
    $scope.fetching = true;
    $http.get('/products?page=' + $scope.page).then(function(list) {
      $scope.fetching = false;
      $scope.loader = false;
      if (list.data.data.length) {
        $scope.items = $scope.items.concat(list.data.data);
      } else {
        $scope.disabled = true; // Disable further calls if there are no more items
      }
    });
  };
}]);
