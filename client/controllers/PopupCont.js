angular.module('MyApp').controller('PopupCont',function ($scope, $modalInstance) {
            $scope.close = function () {
                $modalInstance.dismiss('cancel');
            };
        });
