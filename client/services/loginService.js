angular.module('bridgedb')
.service('loginService',function($http){

 var email;
    return {
        login :function(e){
          email=e;

        },
        getlogin:function(){
            return email;
        }

    }
})
