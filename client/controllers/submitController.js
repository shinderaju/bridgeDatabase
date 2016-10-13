angular.module('MyApp').controller('submitController', function($scope, $http, $stateParams, toastr, $uibModal) {
    var data = {
        key: $stateParams.ProKey
    }
    console.log(data);

           var config = {
               params: data
           };
console.log(config);
    $http.post('http://localhost:3000/getData',data).success(function(data) {
        console.log(data.data);
      //  $scope.jsonData = data.data;
    })
  $scope.jsonData = JSON.stringify({
  "string": "str",
  "number": 12.34,
  "boolean": true,
  "array": [
    3,
    1,
    2
  ],
  "object": {
    "anotheObject": {
      "key1": 1,
      "bool": true
    }
  },
  "arrayOfObjects": [
    {
      "key1": "Hello",
      "key2": "World!"
    },
    {
      "bool": true
    },
    true,
    []
  ],
  "null": null});
    /**
     * upload a file to the server
     */
    $scope.uploadFile = function() {
            var file = $scope.myFile;
            //if no file selected
            if ($scope.myFile == undefined) {
                $scope.errMsg = "File is not selected,please selecte json file";
                toastr.error("file is not selected");
            } else {
                var uploadUrl = "http://localhost:3000/fileUpload";

                var fd = new FormData();
                fd.append('file', file);
                fd.append('key', $stateParams.ProKey);

                /**
                 *post project info to server
                 */
                $http.post(uploadUrl, fd, {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    })
                    .success(function(data) {
                        console.log("success!!");
                        if (data == "Invalid JSON File") {
                            $scope.errMsg = "Invalid JSON File";
                            toastr.info(data);
                        } else {
                            $scope.close(); //close modal
                            toastr.info(data);
                        }
                    })
                    .error(function() {
                        console.log("error!!");
                        $scope.errMsg = "Invalid JSON File";
                    });
            }; //end of else
        } //end of uploadFile()

    $scope.upload = function() {
            $("#fileLoader").click(function() {
                var file = $scope.myFile;
                // var uploadUrl = "http://localhost:3000/fileUpload";
                var fd = new FormData();
                fd.append('file', file);
                console.log($scope.myFile);
            });
        }
        //var modalInstance='';
        /**
         *open modal
         */
    $scope.open = function() {
            console.log("hi");
            $modalInstance = $uibModal.open({
                //  controller: 'PopupCont',
                templateUrl: './partials/Popup.html',
            });
        }
        /**
         *close modal
         */
    $scope.close = function() {
        console.log("hi close");
        $modalInstance.dismiss('cancel');
    };
});
