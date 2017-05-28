/// for Bugs Table

var app=angular.module('sortApp', [])


const d = document.getElementById("extract");
x = (d.innerHTML);


var config = {
    params: {
        id: String(x)
    }
}
app.controller('mainController', function($scope,$http) {
  $http.get("http://localhost:8080/displaybug",config)
    .success(function(data){
      $scope.bugs =data;
      $scope.searchBug = '';
      $scope.showBug = function(bug) {  
  	  $location.path(bug._id+'bugdetail'); 
	}; 
   });
});