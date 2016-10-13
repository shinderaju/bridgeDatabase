angular.module('MyApp')
.controller('storageCtrl',function($scope,$http,$mdToast) {
    $scope.upload=function(){

    $("#fileLoader").click();

    var formdata = new FormData()  ;        //var formdata = {};
            $scope.getTheFiles = function ($files) {
              console.log($files);

                // angular.forEach($files, function (value, key) {
                //   formdata.file = value;
                // });
            };

    $http.post('http://localhost:3000/fileUpload',$files).success(function (d) {

                })
                .error(function () {
                });

    }
     $scope.deleteRowCallback = function(rows){
            $mdToast.show(
                $mdToast.simple()
                    .content('Deleted row id(s): '+rows)
                    .hideDelay(3000)
            );
        };

        $scope.nutritionList = [
            {
                id: 601,
                name: 'Frozen joghurt',
                calories: 159

            },

            {
                id: 610,
                name: 'KitKat',
                  calories: 159

            },
            {
                id: 601,
                name: 'Frozen joghurt',
                calories: 159

            },
            {
                id: 601,
                name: 'Frozen joghurt',
                calories: 159

            },
            {
                id: 601,
                name: 'Frozen joghurt',
                calories: 159

            },
            {
                id: 601,
                name: 'Frozen joghurt',
                calories: 159

            },
            {
                id: 601,
                name: 'Frozen joghurt',
                calories: 159

            },
            {
                id: 601,
                name: 'Frozen joghurt',
                calories: 159

            },
            {
                id: 601,
                name: 'Frozen joghurt',
                calories: 159

            },
            {
                id: 601,
                name: 'Frozen joghurt',
                calories: 159

            },
            {
                id: 601,
                name: 'Frozen joghurt',
                calories: 159

            },
            {
                id: 601,
                name: 'Frozen joghurt',
                calories: 159

            },
            {
                id: 601,
                name: 'Frozen joghurt',
                calories: 159

            }

        ];

})
