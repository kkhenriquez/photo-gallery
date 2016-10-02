app.factory('albums', function($http, $q) {
	
	// Make API call to get list of all albums
	// New Code
	return {
		getAlbums: function() {
			return $http.get('https://jsonplaceholder.typicode.com/albums')
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