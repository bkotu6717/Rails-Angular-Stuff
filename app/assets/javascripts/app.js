app = angular.module('angularRailsStuff', ['ngRoute', 'templates']);

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
app.factory('userService', ['$http', function ($http) {
    dataFactory = {};
    dataFactory.isDuplicateEmail = function (email) {
       return $http({
          method: 'GET',
          url: '/users/email_uniqueness',
          params: {email: email}
        }).then(function successCallback(response) {
           return response.data.data
        }, function errorCallback(response) {
 
        });
    };
  return dataFactory;
}]);

app.directive('checkEmail', function(userService) {
  return {
    restrict: "A",
    require: 'ngModel',
    link: function(scope, ele, attrs, ctrl) {


      ele.bind('blur', function() { 
        scope.$apply(function() {
          // Checking to see if the email has been already registered
          console.log(userService.isDuplicateEmail(scope.user.email));
          if (userService.isDuplicateEmail(scope.user.email)) {
            console.log("true")
            console.log(userService.isDuplicateEmail(scope.user.email));
            ctrl.$setValidity('isDuplicatedEmail', false);
           } else {
            console.log("false")
            console.log(userService.isDuplicateEmail(scope.user.email));
             ctrl.$setValidity('isDuplicatedEmail', true);
           }

        });


      })
    }
  }
})