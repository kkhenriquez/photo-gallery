app.factory('photos', function($http, $q) {
	// New Code
	return {
		getPhotos: function(id) {
			return $http.get('https://jsonplaceholder.typicode.com/photos?albumId='+id)
			.then(function(response) {
				if (typeof response.data === 'object') {
					return response.data;
				} else {
					return $q.reject(response.data);
				}
			}, function(response) {
				return $q.reject(response.data);
			});
		}
	};	
});