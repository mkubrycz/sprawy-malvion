var casesApp = angular.module('casesApp', []);

casesApp.controller('CasesListCtrl', function ($scope, $http) {
	$scope.cases = null;
	$scope.loadCases = function() {
		$scope.loading = true;
		$http.get('sprawy.json', {cache: true})
			.success(function(data) {
				$scope.cases = data;
				$scope.loading = false;
			})
			.error(function(data, status, error, config) {
				$scope.cases = [{heading:"Error",description:"Could not load json   data"}];
				$scope.loading = false;
			});
	};
	$scope.visible = false;
});

casesApp.directive('casesList', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'cases-list.html'
	};
});