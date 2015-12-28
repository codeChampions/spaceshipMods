(function() {
  'use strict';

  angular
  .module('lesson', [
    'ngRoute',
    'ui.ace',
    'ui.bootstrap'
  ])
  .config(function($routeProvider){
    $routeProvider
    .when('/spaceLesson1', {
      templateUrl: 'lesson/views/lessons/part1Lesson.html',
      controller: 'LessonController as lessonCtrl'
    })
    .when('/spaceLesson2', {
      templateUrl: 'lesson/views/lessons/part2Lesson.html',
      controller: 'LessonController as lessonCtrl'
    })
    .when('/spaceLesson3', {
      templateUrl: 'lesson/views/lessons/part3Lesson.html',
      controller: 'LessonController as lessonCtrl'
    });
  });

  }());
