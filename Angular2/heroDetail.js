(function(angular) {
  'use strict';
  function HeroDetailController() {
    this.hero = {
      name: 'IronMan'
    };
  }

  angular.module('kitApp').component('heroDetail', {
    templateUrl: 'heroDetail.html',
    controller: HeroDetailController
  });
})(window.angular);
