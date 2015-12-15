(function() {
  'use strict';

  angular
  .module('space', [
    'ngRoute',
    'ui.ace'
  ])
  .config(function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'views/game.html',
      controller: 'SpaceController as spaceCtrl'
    });
  });


}());
