'use strict';

/**
 * @ngdoc directive
 * @name stephcurrywiththeshotApp.directive:nav
 * @description
 * # nav
 */
angular.module('stephcurrywiththeshotApp')
  .directive('nav', function () {
    return {
      templateUrl: '/views/nav.html',
      restrict: 'E',
      controller: function ($scope, Auth, $state, $timeout, $mdToast) {
        
        $scope.logOutUser = function() {
          Auth.$unauth();
          $state.go('login');
          return $timeout(function() {
            $mdToast.show(
            $mdToast
            .simple()
            .content('You have successfully logged out.')
            .position('bottom right')
            );
          }, 300);
        };

        $scope.$state = $state;

      }
    };
  });