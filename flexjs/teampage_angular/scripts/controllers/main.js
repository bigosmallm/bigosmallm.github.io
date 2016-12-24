'use strict';

/**
 * @ngdoc function
 * @name flexTeamPageApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flexTeamPageApp
 */
angular.module('flexTeamPageApp')
  .controller('MainCtrl', function ($scope,$http) {

    $scope.selectedFilter = 'a';
    $scope.filteredTeamMembers = [];
/*
    $http.get('http://flex.apache.org/team/team.json').then(function(response) {
      $scope.teamMembers = response.data.members;
      $scope.filteredTeamMembers = angular.copy($scope.teamMembers);
    }, function(error) {
      console.log(error);
    });*/

    $scope.teamMembers = g_teamMembers.members;
    $scope.filteredTeamMembers = angular.copy($scope.teamMembers);

    $scope.handleGroup1Change = function() {
      switch ($scope.selectedFilter) {
        case 'a': {
          resetFilters();
          break;
        }
        case 'c': {
          filterForCommitters();
          break;
        }
        case 'p': {
          filterForPMC();
          break;
        }
        case 'm': {
          filterForMentors();
          break;
        }
        default: break;
      }
    };

    function resetFilters() {
      $scope.filteredTeamMembers = angular.copy($scope.teamMembers);
    }

    function filterForCommitters() {
      $scope.filteredTeamMembers = $scope.teamMembers.filter(function (member) {
        return (member.apacheID.indexOf('(C)') != -1);
      });
    }

    function filterForPMC() {
      $scope.filteredTeamMembers = $scope.teamMembers.filter(function (member) {
        return (member.apacheID.indexOf('(C+P)') != -1);
      });
    }

    function filterForMentors() {
      $scope.filteredTeamMembers = $scope.teamMembers.filter(function (member) {
        return (member.title === 'Project Mentor');
      });
    }

  });
