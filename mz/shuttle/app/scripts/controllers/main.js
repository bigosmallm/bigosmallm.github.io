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
    var url = "wss://fepyfhhp.api.platform.machinezone.com/v1";
    var connection = MZ.RTM.create(appkey,{url:url});
    var channel;

    //Centered at MZ Headquarters
    $scope.map = { center: { latitude: 37.419472, longitude: -122.146881 }, zoom: 15,markers: [], options:{icon: 'images/bus_icon.png'} };

    uiGmapGoogleMapApi.then(function(maps) {
      $scope.initRTMChannel();
    });

    $scope.shuttleChannel1;
    $scope.iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

    $scope.initRTMChannel = function() {
      $scope.shuttleChannel1 = connection.createChannel('shuttle-1');

      $scope.shuttleChannel1.on('data', $scope.handleShuttle1Data );
      $scope.shuttleChannel1.subscribe();
    };

    $scope.location;
    $scope.handleShuttle1Data = function(data)
    {

      $scope.location = data.body.messages[0];
      $timeout($scope.updateMap,500);
    };

    $scope.updateMap = function()
    {
      var marker = {
        id: Date.now(),
        coords: {
          latitude: $scope.location.latitude,
          longitude: $scope.location.longitude
        }
      };
      $scope.map.markers = [marker];
    }


  });
