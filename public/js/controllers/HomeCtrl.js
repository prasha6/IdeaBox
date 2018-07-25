angular.module('HomeCtrl', []).controller('HomeController', function($scope, $http, $log) {

	$http.get("api/get/ideas").then(function(response)
	{

		document.getElementById('ideaList').insertAdjacentHTML("beforeend", response.data);
	});

});