angular.module('MyApp')
  .controller('SignupCtrl', function($scope, $location, $auth, toastr) {
    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          $auth.setToken(response);
          console.log(response.data);
         toastr.info('You have successfully created a new account and have been signed-in');
           $location.path('/profile').search({param: response.data.existingUser.email,n:response.data.existingUser._id});
        })
        .catch(function(response) {
          toastr.error(response.data.message);
        });
    };
  });
