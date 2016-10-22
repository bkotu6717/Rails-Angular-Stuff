app.controller('peopleCtrl',['$scope', '$http', '$location', 'People', 'Person', '$routeParams',
 function($scope, $http, $location, People, Person, $routeParams) {
  
  // List all the records
  $scope.people = People.query();
  // Create a new person object
  $scope.person = {};

  // Save new data from the form
  $scope.save = function (valid) {
    if (valid){
      People.create({person: $scope.person}, function(){
        $location.path('/people_list');
      }, function(error){
        console.log(error);
      });
   }
  }

  // Update action
  response = Person.show({id: $routeParams.id});
  response.$promise.then(function(data){
    $scope.person = data.person;
  });
  $scope.update = function(valid){
   if (valid){
     Person.update({id: $scope.person.id, person: $scope.person},function(){
       $location.path('/people_list');
     }, function(error) {
       console.log(error)
    });
   }
  };

  $scope.deleteperson = function(person){
   if (person){
     Person.delete({id: person},function(){
      $scope.people = People.query();
       $location.path('/people_list');
     }, function(error) {
       console.log(error)
    });
   }
  };

}]);