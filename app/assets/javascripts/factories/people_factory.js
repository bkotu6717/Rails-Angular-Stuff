app.factory('People', ['$resource',function($resource){
	 return $resource('/people.json', {},{
		 query: { method: 'GET' },
		 create: { method: 'POST' }
	 })
}]);
 
app.factory('Person', ['$resource', function($resource){
	 return $resource('/people/:id.json', {}, {
		 show: { method: 'GET' },
		 update: { method: 'PUT', params: {id: '@id'} },
		 delete: { method: 'DELETE', params: {id: '@id'} }
	 });
}]);
