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
    $scope.map = {center: { latitude: 37.419472, longitude: -122.146881 },
                  zoom: 15,
                  markers: [],
                  options:{icon: 'images/bus_icon.png'}
    };

    uiGmapGoogleMapApi.then(function(maps) {
      $scope.initRTMChannels();
    });

    $scope.shuttleChannel1;
    $scope.shuttleChannel2;
    $scope.shuttleChannel3;
    $scope.iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

    $scope.initRTMChannels = function() {
      //Shuttle 1
      $scope.shuttleChannel1 = connection.createChannel('Shuttle-1');
      $scope.shuttleChannel1.on('data', $scope.handleShuttle1Data );
      $scope.shuttleChannel1.subscribe();

      //Shuttle 2
      $scope.shuttleChannel2 = connection.createChannel('Shuttle-2');
      $scope.shuttleChannel2.on('data', $scope.handleShuttle2Data );
      $scope.shuttleChannel2.subscribe();

      //Shuttle 3
      $scope.shuttleChannel3 = connection.createChannel('Shuttle-3');
      $scope.shuttleChannel3.on('data', $scope.handleShuttle3Data );
      $scope.shuttleChannel3.subscribe();
    };

    $scope.location1;
    $scope.handleShuttle1Data = function(data)
    {
      $scope.location1 = data.body.messages[0];
      $timeout($scope.updateMap,500);
    };

    $scope.location2;
    $scope.handleShuttle2Data = function(data)
    {
      $scope.location2 = data.body.messages[0];
      $timeout($scope.updateMap,500);
    };

    $scope.location3;
    $scope.handleShuttle3Data = function(data)
    {
      $scope.location3 = data.body.messages[0];
      $timeout($scope.updateMap,500);
    };

    $scope.updateMap = function()
    {

      $scope.map.markers = [];

      if($scope.location1) {
        var marker1 = {
          id: Date.now(),
          coords: {
            latitude: $scope.location1.latitude,
            longitude: $scope.location1.longitude
          }
        };
        $scope.map.markers.push(marker1);
      }

      if($scope.location2) {
        var marker2 = {
          id: Date.now(),
          coords: {
            latitude: $scope.location2.latitude,
            longitude: $scope.location2.longitude
          }
        };
        $scope.map.markers.push(marker2);
      }

      if($scope.location3) {
        var marker3 = {
          id: Date.now(),
          coords: {
            latitude: $scope.location3.latitude,
            longitude: $scope.location3.longitude
          }
        };
        $scope.map.markers.push(marker3);
      }

    }


  });
