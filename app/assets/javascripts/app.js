app = angular.module('angularRailsStuff', ['ngRoute', 'templates',
 'bw.paging', '720kb.datepicker','xeditable', 'tagged.directives.infiniteScroll', 
 'ui.uploader', 'ngResource']);
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

app.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

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
    .when("/actor_upload", {
        templateUrl : "actor_upload.html",
        controller: "actorCtrl"
    })
    .when("/simple_file_upload", {
        templateUrl : "simple_file_upload.html",
        controller: "simpleFileUploadCtrl"
    })
    .when("/actor_list", {
        templateUrl : "actor_list.html",
        controller: "actorCtrl"
    })
    .when("/test_form", {
        templateUrl : "test_form.html",
        controller: "formCtrl"
    })
    .when('/people_list',{
      templateUrl: "people/index.html",
      controller: "peopleCtrl"
    })
    .when('/people_list/new', {
      templateUrl: 'people/new.html',
      controller: 'peopleCtrl'
    })
    .when('/people_list/:id/edit', {
      templateUrl: 'people/edit.html',
      controller: 'peopleCtrl'
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
app.directive('draggable', function($document) {
  return function(scope, element, attr) {
    var startX = 0, startY = 0, x = 0, y = 0;
    element.css({
     position: 'relative',
     cursor: 'pointer',
     display: 'block',
     });
    element.on('mousedown', function(event) {
      // Prevent default dragging of selected content
      event.preventDefault();
      startX = event.screenX - x;
      startY = event.screenY - y;
      $document.on('mousemove', mousemove);
      $document.on('mouseup', mouseup);
    });

    function mousemove(event) {
      y = event.screenY - startY;
      x = event.screenX - startX;
      element.css({
        top: y + 'px',
        left:  x + 'px'
      });
    }

    function mouseup() {
      $document.off('mousemove', mousemove);
      $document.off('mouseup', mouseup);
    }
  };
});