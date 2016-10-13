

angular.module('MyApp', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'satellizer','ui.bootstrap','json-tree'])



  .config(function ($stateProvider, $urlRouterProvider, $authProvider) {

    /**
     * Helper auth functions
     */
    var skipIfLoggedIn = function ($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    };

    var loginRequired = function ($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    };

    /**
     * App routes
     */
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
      .state('profile', {
        url: '/profile?param?n',
        templateUrl: 'partials/profile.html',
        controller: 'projectCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      })

      .state('project', {
            url: '/project?param?n?ProKey',
            templateUrl: 'partials/project.html',
						controller:'projectCtrl'

        })
        .state('project.database', {
            url: '/database',
            templateUrl: 'partials/database.html',
						//controller:'projectCtrl'

        })

        .state('project.storage', {
            url: '/storage',
            templateUrl: 'partials/storage.html',
						// controller:'storageCtrl'

        });

    $urlRouterProvider.otherwise('/');

    /**
     *  Satellizer config
     */
    $authProvider.google({
						url: 'http://localhost:3000/auth/google',
						clientId: '145774676150-bgt2f2r28p0nen5ug32vc0fl1pv47g5s.apps.googleusercontent.com',
						redirectUri: 'http://localhost:3000/profile'

				});


  });
