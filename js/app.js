angular.module('webApp', ['angular.filter'])

.service('service', function($http) {

	// Service that calls various endpoints and returns each result to response.data
	var promise;
	var apiData = {
		getActivity: function() {
			if ( !promise ) {
				var promise = $http.get('https://pure-falls-1534.herokuapp.com/activityfeed')
				.success(function(response) {
					return response.data;
				});
				return promise;
			}
		},
		getAssignedProblems: function() {
			if ( !promise ) {
				var promise = $http.get('https://pure-falls-1534.herokuapp.com/assignedproblems')
				.success(function(response) {
					return response.data;
				});
				return promise;
			}
		},
		getKudos: function() {
			if ( !promise ) {
				var promise = $http.get('https://pure-falls-1534.herokuapp.com/kudos')
				.success(function(response) {
					return response.data;
				});
				return promise;
			}
		},
		getProfile: function() {
			if ( !promise ) {
				var promise = $http.get('https://pure-falls-1534.herokuapp.com/profile')
				.success(function(response) {
					return response.data;
				});
				return promise;
			}
		},
		getSkills: function() {
			if ( !promise ) {
				var promise = $http.get('https://pure-falls-1534.herokuapp.com/skills')
				.success(function(response) {
					return response.data;
				});
				return promise;
			}
		}
	};
	return apiData;
})

.controller('mainController', function(service, $scope) {

	$scope.showKudos = false;

	service.getActivity()
		.then(function(d) {
			$scope.activity = d.data
			// Converts timestamp into date time using moment.js
			for ( i = 0; i < $scope.activity.feed.length; i++ ) {
				var date = new Date($scope.activity.feed[i].timestamp*1000);
				date = moment(date).format("MMM Do");
				$scope.activity.feed[i].timestamp = date;
			}
		})
	service.getAssignedProblems()
		.then(function(d) {
			$scope.assignedProblems = d.data
			console.log($scope.assignedProblems);
		})
	service.getKudos()
		.then(function(d) {
			$scope.kudos = d.data
			console.log($scope.kudos);
		})
	service.getProfile()
		.then(function(d) {
			$scope.profile = d.data
			console.log($scope.profile);
		})
	service.getSkills()
		.then(function(d) {
			$scope.skills = d.data
			console.log($scope.skills);
		})

})
