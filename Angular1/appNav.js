(function(angular) {
  'use strict';
  function RealDetailController() {
    this.hero = {
      real: 'Tony Stark'
    };
  }

  angular.module('kitApp').component('appNav', {
    template: '<nav>' +
      '<a *ngFor="#route of routes"' +
        '[routerLink]="route.path">' +
      '</a>' +
    '</nav>',
    controller: RealDetailController
    /*bindings: {
      hero: '='
    }*/
  });
})(window.angular);
