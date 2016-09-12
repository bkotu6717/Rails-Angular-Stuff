app.directive('checkEmail', function(userService) {
  return {
    restrict: "A",
    require: 'ngModel',
    link: function(scope, ele, attrs, ctrl) {

      ele.bind('blur', function() {
        scope.$apply(function() {
          console.log("Run in blur!");
          // Checking to see if the email has been already registered
          if (userService.isDuplicateEmail(scope.email)) {

            ctrl.$setValidity('isDuplicatedEmail', false);


            return scope.email;;
          } else {

            ctrl.$setValidity('isDuplicatedEmail', true);

            return scope.email;
          }
        });


      })
    }
  }
})