app = angular.module('angularRailsStuff', ['ngRoute', 'templates',
 'bw.paging', '720kb.datepicker','xeditable', 'tagged.directives.infiniteScroll']);
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
      templateUrl : "index.html"
    })
    .when("/users_list", {
        templateUrl : "users_list.html",
        controller: 'usersCtrl'
    })
    .when("/green", {
        templateUrl : "green.html"
    })
    .when("/blue", {
        templateUrl : "blue.html"
    })
    .when("/product_list", {
        templateUrl : "product_list.html",
        controller: "productListCtrl"
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