(function() {
  'use strict';

  angular
  .module('space')
  .controller('SpaceController', function($scope, $location, SpaceService){
    var vm = this;
    vm.mode = 'JavaScript';
    vm.aceOption = {
        mode: vm.mode.toLowerCase(),
        theme: 'monokai',
        onLoad: function(_ace){
          vm.modeChanged = function(){
            _ace.getSession().setMode("ace/mode/" + vm.mode.toLowerCase());
          };
        }
      };
      vm.run = function(){
        SpaceService.run(vm.aceModel);
      };


  })

}());
