angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/profile', {
			templateUrl: 'views/profile.html',
			controller: 'ProfileController'
		})

		.when('/submit', {
			templateUrl: 'views/submit.html',
			controller: 'SubmitController'	
		});

	$locationProvider.html5Mode(true);

}]);