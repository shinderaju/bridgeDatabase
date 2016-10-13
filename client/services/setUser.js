angular.module('MyApp')
  .factory('setUser', function($scope) {
    return {
      setName: function(name) {
        $scope.name = name;
      },
      getName: function() {
        return $scope.name;
      }
    };
  });
