"use strict";angular.module("flexTeamPageApp",["ngAnimate","ngResource","ngRoute","ngSanitize","ngMaterial"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),angular.module("flexTeamPageApp").controller("MainCtrl",["$scope","$http",function(a,b){function c(){a.filteredTeamMembers=angular.copy(a.teamMembers)}function d(){a.filteredTeamMembers=a.teamMembers.filter(function(a){return-1!=a.apacheID.indexOf("(C)")})}function e(){a.filteredTeamMembers=a.teamMembers.filter(function(a){return-1!=a.apacheID.indexOf("(C+P)")})}function f(){a.filteredTeamMembers=a.teamMembers.filter(function(a){return"Project Mentor"===a.title})}a.selectedFilter="a",a.filteredTeamMembers=[],b.get("/scripts/data/team.json").then(function(b){a.teamMembers=b.data.members,a.filteredTeamMembers=angular.copy(a.teamMembers)},function(a){console.log(a)}),a.handleGroup1Change=function(){switch(a.selectedFilter){case"a":c();break;case"c":d();break;case"p":e();break;case"m":f()}}}]),angular.module("flexTeamPageApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("flexTeamPageApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<md-radio-group ng-model="selectedFilter" ng-change="handleGroup1Change()"> <div layout="row" flex="50" layout-paddings> <md-radio-button value="c" flex>Committers</md-radio-button> <md-radio-button value="p" flex>PMC Members</md-radio-button> <md-radio-button value="m" class="md-primary" flex>Mentors</md-radio-button> <md-radio-button value="a" class="md-primary" flex>All</md-radio-button> </div> </md-radio-group> <div layout="row" layout-wrap layout-fill layout-align="space-between"> <md-card class="card md-whiteframe-5dp" ng-repeat="member in filteredTeamMembers"> <md-card-title> <md-card-title-text> <span class="md-headline">{{member.name}}</span> <span class="md-subhead">{{member.apacheID}}</span> <div ng-bind-html="member.bio" class="bio"></div> </md-card-title-text> <md-card-title-media> <div class="md-media-lg card-media"> <img ng-src="http://flex.apache.org/{{member.photoURL}}"> </div> </md-card-title-media> </md-card-title> <md-card-actions layout="row" layout-align="end center"> <md-button class="md-fab md-mini md-primary" href="{{member.twitter}}" ng-show="member.twitter != \'\' " aria-label="twitter"> <i class="fa fa-twitter" aria-hidden="true"></i> </md-button> <md-button class="md-fab md-mini md-accent" href="{{member.linkedIn}}" ng-show="member.linkedin != \'\' " aria-label="linkedin"> <i class="fa fa-linkedin" aria-hidden="true"></i> </md-button> <md-button class="md-fab md-mini" href="{{member.facebook}}" ng-show="member.facebook != \'\' " aria-label="facebook"> <i class="fa fa-facebook" aria-hidden="true"></i> </md-button> <md-button class="md-fab md-mini md-warn" href="{{member.github}}" ng-show="member.github != \'\' " aria-label="github"> <i class="fa fa-github" aria-hidden="true"></i> </md-button> </md-card-actions> </md-card> </div>')}]);