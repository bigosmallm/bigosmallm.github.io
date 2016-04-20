'use strict';

/**
 * @ngdoc overview
 * @name Amaranth - A Virtual Marketplace
 * @description
 * # webappApp
 *
 * Main module of the application.
 */
angular
  .module('webappApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps',
    'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/sleeper/', {
        templateUrl: 'views/sleeper.html',
        controller: 'SleeperCtrl',
        controllerAs: 'sleeper'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
