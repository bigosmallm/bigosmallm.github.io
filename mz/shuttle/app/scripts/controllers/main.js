'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('MainCtrl', function ($scope,$timeout,uiGmapGoogleMapApi) {

    var appkey = '39A3cF14CfDde6a10E494C0bD5CBc97D';
    var connection = MZ.RTM.create(appkey);
    var channel;

    //Centered at MZ Headquarters
    $scope.map = { center: { latitude: 37.419472, longitude: -122.146881 }, zoom: 15,markers: [], options:{icon: 'images/bus_icon.png'} };

    uiGmapGoogleMapApi.then(function(maps) {
      console.log('I am ready!');
      $scope.initRTMChannel();
    });

    $scope.shuttleChannel1;
    $scope.iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

    $scope.initRTMChannel = function() {
      $scope.shuttleChannel1 = connection.createChannel('shuttle-1');

      var _scope = $scope;
      var _this = this;
      var _timeout = $timeout;

      $scope.shuttleChannel1.on('data', function(data)
      {
        var location = data.body.messages[0];
        var marker = {
          id: Date.now(),
          coords: {
            latitude: location.latitude,
            longitude: location.longitude
          }
        };
        $scope.map.markers = [marker];
      });
      $scope.shuttleChannel1.subscribe();
    }


  });
