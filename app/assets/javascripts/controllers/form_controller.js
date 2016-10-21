app.controller('formCtrl',['$scope', '$http', function($scope, $http) {
  $scope.loader = false;
  // Fetch more items
  $scope.submitForm = function() {
    alert('Wow!!');
  };
}]);
