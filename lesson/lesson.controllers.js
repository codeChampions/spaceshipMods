(function() {
  'use strict';

  angular
    .module('lesson')
    .controller('LessonController', function($scope, $location, $timeout, LessonService){
        var vm = this;

        vm.getStatus = function(){
          LessonService.getStatus().then(function(res){
            vm.lesson1Progress = res.data.lesson1Progress;
            console.log(vm.lesson1Progress);
            vm.progress();
          });
        };
        vm.getStatus();

      //setting the lesson data based on the url
      vm.pickData = function(){
        var loc = $location.url();
        switch (loc) {
          case '/lesson1':
          vm.lessonData = vm.lessonsData[0];
            break;
          case '/lesson2':
          console.log(loc);
            vm.lessonData = vm.lessonsData[1];
              break;
          default:

        }
      };
      vm.pickData();
        vm.goToLesson1 = function(){
          switch (vm.lesson1Progress) {
            case 0:
              $location.path('/lesson');
              break;
            case 1:
              $location.path('/lesson1');
              break;
            default: $location.path('/404');
          }
        };

        vm.max = 100;

  vm.progress = function() {
    var value = Math.round(vm.lesson1Progress / 3*100);
    console.log(value);
    // var type;

    // if (value < 25) {
    //   type = 'success';
    // } else if (value < 50) {
    //   type = 'info';
    // } else if (value < 75) {
    //   type = 'warning';
    // } else {
    //   type = 'danger';
    // }

    // vm.showWarning = (type === 'danger' || type === 'warning');

    vm.dynamic = value;
    // vm.type = type;
  };

  // vm.randomStacked = function() {
  //   vm.stacked = [];
  //   var types = ['success', 'info', 'warning', 'danger'];
  //
  //   for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
  //       var index = Math.floor((Math.random() * 4));
  //       vm.stacked.push({
  //         value: Math.floor((Math.random() * 30) + 1),
  //         type: types[index]
  //       });
  //   }
  // };
  // vm.randomStacked();


    });


}());
