(function() {
  'use strict';

  angular
  .module('space', [
    'ngRoute',
    'ui.ace',
    'ui.bootstrap'
  ])
  .config(function($routeProvider, $sceDelegateProvider){
    $routeProvider
    .when('/spaceGame1', {
      templateUrl: 'game/views/games/part1Game.html',
      controller: 'SpaceController as spaceCtrl'
    })
    .when('/spaceGame2', {
      templateUrl: 'game/views/games/part2Game.html',
      controller: 'SpaceController as spaceCtrl'
    })
    .when('/spaceGame3', {
      templateUrl: 'game/views/games/part3Game.html',
      controller: 'SpaceController as spaceCtrl'
    });
});

}());
