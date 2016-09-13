app.controller('usersCtrl',['$scope', '$http', function($scope, $http) {
	$scope.success_message = '';
	$scope.error_message = '';
	$scope.edituser = false;
	$scope.createuser = false;
	$scope.OrderByField = 'name';
	$scope.sortOder = true;
  $scope.loader = false;
  $http.get('/users?params[:page]=1')
    .then(function(response) {
      $scope.users = response.data.data;
      $scope.page = 1;
      $scope.page_size =10;
      $scope.total = response.data.total;
    });
    $scope.editUser = function(user){
    	$scope.user = user;
    	$scope.edituser = true;
    	$scope.createuser = false;
    }
   $scope.paginate = function(page) {
    $scope.loader = true;
   	 $http.get('/users?page='+page)
    .then(function(response) {
      $scope.users = response.data.data;
      $scope.loader = false;
    });
   }
    $scope.initilizeUser = function(){
  		$scope.createuser = true;
  		$scope.edituser = false;
  		$scope.user ={};
    }

    $scope.sort_by = function(column) {
    	// $scope.OrderByField = 'name';
    	$scope.sortOder = !($scope.sortOder);
    }

    $scope.createUser = function(user,userform) {
    	if(userform.$valid){
    		$http({
        method: 'POST',
        url: '/users/',
        data : {user: $scope.user}
      }).then(function successCallback(response) {
      	$scope.success_message = response.data.message;
      	$scope.users.push(response.data.data)
      	$('#myModal').modal('toggle');
       }, function errorCallback(response) {
        $scope.error_message = response.data.message;
        $('#myModal').modal('toggle'); 
      });
    	}
    }

    $scope.updateUser = function(user,id) {
    	$scope.success_message = '';
			$scope.error_message = '';
    	$scope.edit_user = {};
    	$scope.edit_user.name = user.name;
    	$scope.edit_user.email = user.email;
    	$scope.edit_user.dob = user.dob;
     	$http({
          method: 'PATCH',
          url: '/users/'+id,
          data : {user: $scope.edit_user}
        }).then(function successCallback(response) {
        	$scope.success_message = response.data.message;
          }, function errorCallback(response) {
          $scope.error_message = response.data.message;
         });
    }
    $scope.deleteUser = function(id) {
     	if(confirm("Do you want to delete this user?") == true){
    		$scope.success_message = '';
				$scope.error_message = '';
    		$http.delete('/users/' + id)
    			.then(function(response) {
            var user;
            for (var i = $scope.users.length - 1; i >= 0; i--) {
              if($scope.users[i].id == id){
                 user = $scope.users[i];
              }
            }
    				var index = $scope.users.indexOf(user)
    				$scope.users.splice(index, 1);
    			$scope.success_message = response.data.message;
    		})
    	}
    }
}]);

