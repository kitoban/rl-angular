(function(angular) {
  'use strict';
  angular.module('kitApp', ['ngComponentRouter', 'ngResource'])

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

  function BaseController( MenuService, PageService, $sce ) {
    this.menu = MenuService.getMenu();
    this.selectedUrl = '';
    this.page = '';

    this.getPage = function( page ) {
      var pageUrl = 'http://test.rlsas.co.uk/wp-json/wp/v2/pages/' + page.object_id;
      this.selectedUrl = pageUrl;

      PageService.get( { object_id: page.object_id }, ( ret ) => {
        this.page = ret.content.rendered;
      } );

      this.page = '<img src="loading_icon.gif" alt="Loading..." />';

    };
  }

})(window.angular);
