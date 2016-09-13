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