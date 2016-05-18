(function(angular) {
  'use strict';
  angular.module('kitApp', ['ngComponentRouter'])

  .config( function( $locationProvider ) {
    $locationProvider.html5Mode(true);
  })
  .value('$routerRootComponent', 'app')
  .component('app', {
    templateUrl: 'indexTemplate.html',
    $routeConfig: [
      {path: '/', name: 'HeroDetail', component: 'heroDetail', useAsDefault: true},
      {path: '/real-detail/', name: 'RealDetail', component: 'realDetail' }
    ],
    controller: BaseController
  });

  function BaseController( MenuService ) {
    this.menu = MenuService.getMenu();
  }

})(window.angular);
