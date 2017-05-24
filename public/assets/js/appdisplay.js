// app.js
var app=angular.module('sortApp', [])

app.controller('mainController', function($scope,$http) {
  $http.get("http://localhost:8080/display")
    .success(function(data){
      $scope.features =data;
      $scope.searchFeature = '';
      $scope.showFeature = function(feature) {
  	  $location.path('profile/'+features._id+'bugs'); 
	}; 
   });
});




/*
var phonecatApp = angular.module('phonecatApp', []);   
phonecatApp.controller('PhoneListCtrl', function ($scope, $http) {
 $http.get('phones/phones.json').success(function(data) {
$scope.phones = data;
}); 
$scope.orderProp = 'age';
});
  */