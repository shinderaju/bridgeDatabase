angular.module('MyApp')
    .controller('projectCtrl', function($scope, $location, $http, $stateParams, toastr) {
        $scope.projectName1 = "";
        $scope.projectName = "";
        $scope.param = $stateParams.param
        $scope.n = $stateParams.n;
        // console.log($scope.param,$scope.n)
        var data = {
            key: $scope.n,
            email: $scope.param
        }
        $scope.user = $scope.param;
        console.log('data', data)
        $http.post('http://localhost:3000/retrive', data).success(function(data) {
            console.log(data);
            $scope.projectName1 = data;
            $scope.names = [];
            angular.forEach(data, function(value, key) {

                $scope.names.push(value.nameForUser);
            });
            // $location.path('project')  ;
        })
        $scope.createProject = function(projectName) {
            var x = {
                pro: $scope.projectName,
                key: $scope.n,
                email: $scope.param
            }
            console.log('project', x)
            $http.post('http://localhost:3000/project', x).success(function(data1) {
                console.log(data1);
                toastr.success(data1);
                $http.post('http://localhost:3000/retrive', data).success(function(data12) {
                    console.log(data12);
                    $scope.projectName1 = data12;
                    $scope.names = [];
                    angular.forEach(data12, function(value, key) {

                        $scope.names.push(value.nameForUser);
                    });
                    // $location.path('project')  ;
                });
            });
        };
        $scope.project = function(projectKey) {
            console.log("pro key " + projectKey);
            $location.path('/project').search({
                param: $scope.param,
                n: $scope.n,
                ProKey: projectKey
            });
        }
    })
    .directive('navHeader', function() {
        return {
            templateUrl: 'partials/nav.html'
        };
    });
