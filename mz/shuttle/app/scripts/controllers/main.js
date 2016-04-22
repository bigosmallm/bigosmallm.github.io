/**
 * @ngdoc function
 * @name webappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappApp
 */
'use strict';
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
                  options:{icon: 'images/shuttle_top.png'}
    };

    $scope.stop = {};
    $scope.stop.options = {icon: 'images/StartPointRed.png'};
    $scope.stop.mz =
      {
        coords: {latitude: 37.419472, longitude: -122.146881},
        show: false,
        templateURL:'scripts/templates/mz.stop.template.html',
        isIconVisibleOnClick: true,
        id: 'stop_mz',
        parent: $scope
      };

    $scope.handleMZStopClose = function() {

    };

    $scope.stop.caltrain =
    {
      coords: {latitude: 37.428844, longitude: -122.141447},
      show: false,
      templateURL:'scripts/templates/caltrain.stop.template.html',
      isIconVisibleOnClick: true,
      id: 'stop_caltrain',
      parent: $scope
    };


    $scope.handleCaltrainStopClose = function() {

    };
    $scope.stop.hanover =
    {
      coords: {latitude: 37.413233, longitude: -122.142615},
      show: false,
      templateURL:'scripts/templates/hanover.stop.template.html',
      isIconVisibleOnClick: true,
      id: 'stop_hanover',
      parent: $scope
    };


    $scope.handleHanoverStopClose = function() {

    };
    uiGmapGoogleMapApi.then(function(maps) {
      $scope.initRTMChannels();
    });

    $scope.shuttleChannel1;

    $scope.shuttleChannel2;
    $scope.shuttleChannel3;
    $scope.shuttleRequestChannel;
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
      //Shuttle request channel

      $scope.shuttleRequestChannel = connection.createChannel('Requests');


    };
    $scope.location1;
    $scope.prevLocation1;

    $scope.handleShuttle1Data = function(data)
    {
      $scope.prevLocation1 = $scope.location1;
      $scope.location1 = data.body.messages[0];
      $timeout($scope.updateShuttle1Map,500);
    };


    $scope.location2;
    $scope.prevLocation2;
    $scope.handleShuttle2Data = function(data)
    {
      $scope.prevLocation2 = $scope.location2;
      $scope.location2 = data.body.messages[0];
      $timeout($scope.updateShuttle2Map,500);
    };

    $scope.location3;
    $scope.prevLocation3;
    $scope.handleShuttle3Data = function(data)
    {
      $scope.prevLocation3 = $scope.location3;
      $scope.location3 = data.body.messages[0];
      $timeout($scope.updateShuttle3Map,500);
    };
    $scope.shuttle1 = {id: Date.now()};

    $scope.updateShuttle1Map = function() {

      if($scope.prevLocation1) {
        var p1 = new LatLon($scope.prevLocation1.latitude, $scope.prevLocation1.longitude);
        var p2 = new LatLon($scope.location1.latitude, $scope.location1.longitude);
        var b2 = p1.finalBearingTo(p2);
      }

      if ($scope.location1) {
        var marker = {
          id: Date.now(),
          coords: {
            latitude: $scope.location1.latitude,
            longitude: $scope.location1.longitude
          },
          options: {
            icon: 'images/BusFrontIcon.png',
            rotation: b2
          }
        };
        $scope.shuttle1 = marker;
      }
    };
    $scope.shuttle2 = {id: Date.now()};

    $scope.updateShuttle2Map = function() {

      if($scope.prevLocation2) {
        var p1 = new LatLon($scope.prevLocation2.latitude, $scope.prevLocation2.longitude);
        var p2 = new LatLon($scope.location2.latitude, $scope.location2.longitude);
        var b2 = p1.finalBearingTo(p2);
      }
      if ($scope.location2) {
        var marker = {
          id: Date.now(),
          coords: {
            latitude: $scope.location2.latitude,
            longitude: $scope.location2.longitude
          },
          options: {
            icon: 'images/BusFrontIcon.png',
            rotation: b2
          }
        };
        $scope.shuttle2 = marker;
      }
    };
    $scope.shuttle3 = {id: Date.now()};

    $scope.updateShuttle3Map = function() {

      if($scope.prevLocation3) {
        var p1 = new LatLon($scope.prevLocation3.latitude, $scope.prevLocation3.longitude);
        var p2 = new LatLon($scope.location3.latitude, $scope.location3.longitude);
        var b2 = p1.finalBearingTo(p2);
      }
      if ($scope.location3) {
        var marker = {
          id: Date.now(),
          coords: {
            latitude: $scope.location3.latitude,
            longitude: $scope.location3.longitude
          },
          options: {
            icon: 'images/BusFrontIcon.png',
            rotation: b2
          }
        };
        $scope.shuttle3 = marker;
      }
    };
    //Requests
    $scope.stop.mz.to = '';
    $scope.requestAtMZ = function() {
      var request = {};
      request.from = "MZ";
      request.to = $scope.stop.mz.to;
      $scope.sendRequest(request);
      $scope.stop.mz.show = false;
      $scope.stop.mz.visible = false;
    };

    $scope.requestAtCaltrain = function() {
      var request = {};
      request.from = "Caltrain";
      request.to = "MZ";
      $scope.sendRequest(request);
      $scope.stop.caltrain.show = false;
    };

    $scope.requestAtHanover = function() {
      var request = {};
      request.from = "Hanover";
      request.to = "MZ";
      $scope.sendRequest(request);
      $scope.stop.hanover.show = false;
    };

    $scope.sendRequest = function(request) {
      var message = {from:request.from, to:request.to};
      $scope.shuttleRequestChannel.publish(message);
    }

  });
