(function(angular) {
  'use strict';
function RealDetailController() {
  this.hero = {
    real: 'Tony Stark'
  };
}

angular.module('heroApp').component('realDetail', {
  templateUrl: 'realDetail.html',
  controller: RealDetailController
  /*bindings: {
    hero: '='
  }*/
});
})(window.angular);
