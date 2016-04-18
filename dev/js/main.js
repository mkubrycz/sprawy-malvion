var casesApp = angular.module('casesApp', []);

casesApp.controller('CasesListCtrl', function ($scope, $http) {
	$scope.cases = null;
	$http.get('sprawy.json')
		.success(function(data) {
			$scope.cases = data;
		})
		.error(function(data, status, error, config) {
			$scope.cases = [{heading:"Error",description:"Could not load json   data"}];
		});
});