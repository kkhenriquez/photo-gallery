app.controller('AlbumController', function ($scope, $routeParams, photos, Lightbox) {

  // New Code
  var displayPhotos = function() {
  	photos.getPhotos($routeParams.id)
  	.then(function(data) {
  		$scope.photos = data;
  	}, function(error) {
  		console.log('error', error);
  	});
  };

  displayPhotos();

  // Function to open Lightbox with full width picture when clicking a picture
  $scope.openLightboxModal = function (index) {
    Lightbox.openModal($scope.photos, index);
  };
});