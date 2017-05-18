var app = angular.module('featureTable', []);
app.controller('featureDisplay', function($scope, $http) {
    $http.get("http://localhost:8080/display")
    .then(function (response) {$scope.names = response.data.records;});
});
