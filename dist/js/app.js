// Declare the module
var app = angular.module('GalleryApp', ['ngRoute', 'bootstrapLightbox', 'ngSanitize']);

// Configure the routes
app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'HomeController',
			templateUrl: 'views/home.html'
		})
		.when('/albums/:id', {
			controller: 'AlbumController',
			templateUrl: 'views/album.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});

//Set the new template for Lightbox
app.config(function (LightboxProvider) {
	LightboxProvider.templateUrl = 'views/box.html'
});