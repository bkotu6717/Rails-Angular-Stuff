app.factory('dataService', ['$http', function ($http) {
  dataFactory = {};
  dataFactory.checkUniqueValue = function (value) {
    return $http({
         method: 'GET',
         url: '/users/email_uniqueness',
         params: { email: value}
      }).then(function successCallback(response) {
         return !(response.data.data)
    });
  };
   return dataFactory;
}]);