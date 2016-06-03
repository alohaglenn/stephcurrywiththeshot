'use strict';

/**
 * @ngdoc overview
 * @name stephcurrywiththeshotApp
 * @description
 * # stephcurrywiththeshotApp
 *
 * Main module of the application.
 */
angular.module('stephcurrywiththeshotApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'firebase',
    'firebase.ref',
    'firebase.auth',
    'ui.router',
    'ngMaterial',
    'jlareau.bowser'
  ])

  .config(function($stateProvider, $urlRouterProvider, $compileProvider) {

    $compileProvider.debugInfoEnabled(false);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          requireAuth: function(Auth) {
            return Auth.$requireAuth();
          }
        }
      });

      $urlRouterProvider
        .otherwise('/main');
  })

    .run(function($rootScope, $state, $mdToast, $timeout, bowser, $mdDialog) {

      if(bowser.msie) {
        $mdDialog.show({
          templateUrl: 'views/unsupported.html',
          clickOutsideToClose: false
       });
      }

      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if(error === 'AUTH_REQUIRED') {
          $state.go('login');
        }
        return $timeout(function() {
          $mdToast.show(
            $mdToast
            .simple()
            .content('You must be loggin in to view this page.')
            .position('bottom right')
          );
        }, 300);
      });

    });
