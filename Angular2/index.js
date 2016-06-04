( function( angular, _ ) {
  'use strict';
  var app = angular.module('kitApp', ['ngComponentRouter', 'ngResource']);

  app.config( function( $routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $locationProvider ) {
    $locationProvider.html5Mode(true);

    app.controllerProvider = $controllerProvider;
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

  function BaseController( MenuService, PageService, $rootRouter, $rootScope, $timeout ) {
    this.menu = [];
    this.testMenu = [];

    MenuService.get( {}, ( menu ) => {



      $timeout( () => {
        function LazyHeroDetailController() {
          this.hero = {
            name: 'Robert'
          };
        }

        app.compileProvider.component('lazyHero', {
          templateUrl: 'lazyHero.html',
          controller: LazyHeroDetailController
        });

        var routerLinkName = 'LazyHero';

        $rootRouter.registry.config('app', {path: '/lazy-hero/', name: routerLinkName, component: 'lazyHero' } );

        this.testMenu.push(routerLinkName);
        $rootScope.$digest();

        var instruction = $rootRouter.generate([routerLinkName]);
        $rootRouter.navigateByInstruction(instruction);
      } );


      _.forEach( menu.items, ( item ) => {
        var ref = item.object_id + '_page';

        function PageDisplayController() {
          this.ref = {
            object_id: item.object_id
          };
          this.page = '<img src="loading_icon.gif" alt="Loading..." />';

          PageService.get( { object_id: item.object_id }, ( ret ) => {
            this.page = ret.content.rendered;
          } );
        }

        app.compileProvider.component(ref, {
          templateUrl: 'pageDisplay.html',
          controller: PageDisplayController
        });

        $rootRouter.registry.config('app', {path: '/' + ref + '/', name: ref, component: ref } );

        this.menu.push( {
          title: item.title,
          object_id: item.object_id,
          ref: ref
        } );
      } );
    });
    this.selectedUrl = '';
    this.page = '';


    this.testMenu.push('HeroDetail');
    this.testMenu.push('RealDetail');


    this.getPage = function( page ) {
      var pageUrl = 'http://test.rlsas.co.uk/wp-json/wp/v2/pages/' + page.object_id;
      this.selectedUrl = pageUrl;

      PageService.get( { object_id: page.object_id }, ( ret ) => {
        this.page = ret.content.rendered;
      } );

      this.page = '<img src="loading_icon.gif" alt="Loading..." />';

    };
  }

})( window.angular, window._ );
