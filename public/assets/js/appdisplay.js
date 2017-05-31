// app.js
var app = angular.module('sortApp', [])

app.controller('mainController', function($scope, $http) {
    $http.get("http://localhost:8080/display")
        .success(function(data) {
            $scope.features = data;
            $scope.searchFeature = '';
            $scope.showFeature = function(feature) {
                $location.path('profile/' + features._id + 'bugs');
            };
        });
});
