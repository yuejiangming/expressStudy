angular.module('app', [])
  .controller('blogController', blogController);

blogController.$inject = ['$scope', '$http'];

function blogController($scope, $http) {
  $http.get('/totalCount')
    .then(function(res) {
      $scope.totalCount = res.data.totalCount;
    });

  $scope.clickOnce = function() {
    $http.post('/totalCount/' + ($scope.totalCount + 1))
      .then(function() {
        $scope.totalCount = $scope.totalCount + 1;
      });
  }
}