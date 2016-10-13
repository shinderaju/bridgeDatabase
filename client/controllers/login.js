angular.module('MyApp')
    .controller('LoginCtrl', function($scope, $location, $auth, toastr) {
        $scope.login = function() {
            $auth.login($scope.user).then(function(data) {
                    console.log('data ', data.data.user)
                    toastr.success('You have successfully signed in!');
                    $location.path('/profile').search({
                        param: data.data.user.email,
                        n: data.data.user._id
                    });
                })
                .catch(function(error) {
                    toastr.error(error.data.message, error.status);
                });
        };
        $scope.authenticate = function(provider) {
            $auth.authenticate(provider).then(function(data) {
                    console.log('google data', data)
                    toastr.success('You have successfully signed in with ' + provider + '!');
                    $location.path('/profile').search({
                        param: data.data.existingUser.displayName,
                        n: data.data.existingUser._id
                    });
                })
                .catch(function(error) {
                    if (error.message) {
                        // Satellizer promise reject error.
                        toastr.error(error.message);
                    } else if (error.data) {
                        // HTTP response error from server
                        toastr.error(error.data.message, error.status);
                    } else {
                        toastr.error(error);
                    }
                });
        };
    });
