app = angular.module('angularRailsStuff', ['ngRoute', 'templates', 'bw.paging']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
      templateUrl : "index.html",
      controller: 'usersCtrl'
    })
    .when("/red", {
        templateUrl : "red.html"
    })
    .when("/green", {
        templateUrl : "green.html"
    })
    .when("/blue", {
        templateUrl : "blue.html"
    })
    .otherwise({
        redirectTo: 'public/404'
    });
    // user the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

app.factory('dataService', ['$http', function ($http) {
        dataFactory = {};
        dataFactory.checkUniqueValue = function (value) {
             return $http({
                 method: 'GET',
                 url: '/users/email_uniqueness',
                 params: {email: value}
              }).then(function successCallback(response) {
                 return !(response.data.data)
              });
        };
         return dataFactory;
}]);
app.directive('wcUnique', ['dataService', function (dataService) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.bind('blur', function (e) {
                if (!ngModel || !element.val()) return;
                var keyProperty = scope.$eval(attrs.wcUnique);
                var currentValue = element.val();
                dataService.checkUniqueValue(currentValue)
                    .then(function (unique) {
                        if (currentValue == element.val()) { 
                            ngModel.$setValidity('unique', unique);
                        }
                    }, function () {
                        ngModel.$setValidity('unique', true);
                    });
            });
        }
    }
}]);