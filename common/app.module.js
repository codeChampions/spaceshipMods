(function() {
  'use strict';

  angular
    .module('spaceGame', [
      'ngRoute',
      'underscore',
      'ui.bootstrap',
      'ui.ace',
      'lesson',
      'space',
    ])
    .config(function($routeProvider){
      $routeProvider
        .when('/404',{
          template: '<h1>Sorry page not found</h1>',
          controller: 'MainController'
        })
        .otherwise({redirectTo: '/404'});
    });

    angular
      .module('underscore',[])
      .factory('_', function($window){
        return $window._;
      });
}());
