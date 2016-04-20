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

	$scope.isEmpty = function (data) {
	  	if(typeof(data) == 'number' || typeof(data) == 'boolean') { 
			return false; 
		}
		if(typeof(data) == 'undefined' || data === null) {
		  	return true; 
		}
		if(typeof(data.length) != 'undefined') {
			return data.length == 0;
		}
		var count = 0;
		for(var i in data) {
			if(data.hasOwnProperty(i))
			{
		    	count ++;
			}
		}
		return count == 0;
	};
});

casesApp.directive('casesList', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'cases-list.html'
	};
});