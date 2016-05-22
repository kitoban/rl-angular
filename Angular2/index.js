(function(angular) {
  'use strict';
  var app = angular.module('kitApp', ['ngComponentRouter', 'ngResource'])

  app.config( function( $routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $locationProvider
  //  , $componentProvider
  ) {
    $locationProvider.html5Mode(true);

    app.controllerProvider = $controllerProvider;
    //app.componentProvider = $componentProvider;
    app.compileProvider    = $compileProvider;
    app.routeProvider      = $routeProvider;
    app.filterProvider     = $filterProvider;
    app.provide            = $provide;
    app.locationProvider   = $locationProvider;

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

  function BaseController( MenuService, PageService, $rootRouter ) {
    this.menu = MenuService.getMenu();
    this.selectedUrl = '';
    this.page = '';

    this.testMenu = [];

    this.testMenu.push('HeroDetail');
    this.testMenu.push('RealDetail');


    function LazyHeroDetailController() {
      this.hero = {
        name: 'Robert'
      };
    }

    app.compileProvider.component('lazyHero', {
      templateUrl: 'lazyHero.html',
      controller: LazyHeroDetailController
    });

    $rootRouter.registry.config('app', {path: '/lazy-hero/', name: 'LazyHero', component: 'lazyHero' } );

    this.testMenu.push('LazyHero');



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
