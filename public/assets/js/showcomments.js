/// for showing comment
var app = angular.module('sortApp', [])

const d = document.getElementById("extract_id");
x = (d.innerHTML);
console.log("value of x: " + x);

var config = {
    params: {
        id: String(x)
    }
}
console.log("Value of config: "+config);

app.controller('mainController', function($scope,$http) {
  $http.get("http://localhost:8080/displaycomments",config)
    .success(function(data){
      $scope.bugs = data;
      $scope.searchBug = '';
   });
});