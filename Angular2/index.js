( function( angular, _ ) {
  'use strict';
  var app = angular.module( 'kitApp', ['ngComponentRouter', 'ngResource'] );

  app.config( function( $routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $locationProvider ) {
    $locationProvider.html5Mode( true );

    //app._controllerProvider = $controllerProvider;
    app._compileProvider    = $compileProvider;
    /*app._routeProvider      = $routeProvider;
    app._filterProvider     = $filterProvider;
    app._provide            = $provide;
    app._locationProvider   = $locationProvider;*/

  } )
  .value( '$routerRootComponent', 'app' )
  .component( 'app', {
    templateUrl: 'indexTemplate.html',
    $routeConfig: [
      { path: '/', name: 'HeroDetail', component: 'heroDetail', useAsDefault: true },
      { path: '/real-detail/', name: 'RealDetail', component: 'realDetail' }
    ],
    controller: BaseController
  } );

  function BaseController( MenuService, PageService, $rootRouter, $rootScope, $timeout ) {
    this.menu = [];
    this.testMenu = [];

    MenuService.get( {}, ( menu ) => {

      /*
      $timeout( () => {
        function LazyHeroDetailController() {
          this.hero = {
            name: 'Robert'
          };
        }

        app._compileProvider.component('lazyHero', {
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
*/
      $rootScope.$siteData = {};

      function getPageSlug( url ) {
        var baseUrlRegex = /^.+?[^\/:](?=[?\/]|$)\//g;
        var fullPath = url.replace( baseUrlRegex, '' );
        if ( fullPath.charAt( fullPath.length - 1 ) === '/' ) {
          fullPath = fullPath.slice( 0, fullPath.length - 1 );
        }
        var pathSplit = fullPath.split( '/' );
        return pathSplit[pathSplit.length - 1];
      }

      function processMenuItem( menuItem ) {

        var ret = {
          slug: getPageSlug( menuItem.url ),
          id: menuItem.id,
          object_id: menuItem.object_id,
          title: menuItem.title,
          parent: menuItem.parent,
          url: menuItem.url,
          order: menuItem.order,
          children: {}
        };

        _.forEach( menuItem.children, ( subItem ) => {
          addMenuItemToParent( ret.children, subItem );
        } );

        return ret;
      }

      function addMenuItemToParent( parent, menuItem ) {
        var menuObj = processMenuItem( menuItem );
        parent[menuObj.slug] = menuObj;
        if ( !parent.orderedRef ) {
          parent.orderedRef = [];
        }
        parent.orderedRef.push( menuObj );
      }

      _.forEach( menu.items, ( item ) => {
        addMenuItemToParent( $rootScope.$siteData, item );
      } );

      buildPages( $rootScope.$siteData, this.menu, '' );

      function buildPages( refObj, menu, currentPath ) {
        _.forEach( refObj.orderedRef, ( menuItem ) => {
          var page = buildPage( menuItem.slug, menuItem.title, currentPath );
          buildPages( menuItem.children, page.subMenu, currentPath + '/' + menuItem.slug );
          menu.push( page );
        } );
      }

      function normalize( c ) {
        return c[1].toUpperCase();
      }
      //console.log("ngModel:", "ngModel".replace(/[A-Z]/g, denormalize));

      function buildPage( ref, title, currentPath ) {

        var name = ref.replace( /-[a-z]/g, normalize );
        name = name[0].toUpperCase() + name.slice( 1, name.length );

        /*app._compileProvider.component( ref, {
          //templateUrl: 'pageDisplay.html',
          template: 'abc',
          controller: PageDisplayController
        } );*/

        var routeObj = { path: currentPath + '/' + ref + '/', name: name, component: 'pageDisplay' };
        console.log( routeObj );
        $rootRouter.registry.config( 'app', routeObj );

        return {
          title: title,
          subMenu: [],
          ref: name
        };
      }

    } );

    /*function PageDisplayController( $location ) {
      this.page = '<img src="loading_icon.gif" alt="Loading..." />';
      console.log( $location.path() );
      /*PageService.get( { object_id: item.object_id }, ( ret ) => {
        this.page = ret.content.rendered;
      } );*/
    //}


    this.selectedUrl = '';
    this.page = '';


    this.testMenu.push( 'HeroDetail' );
    this.testMenu.push( 'RealDetail' );


    this.getPage = function( page ) {
      var pageUrl = 'http://test.rlsas.co.uk/wp-json/wp/v2/pages/' + page.object_id;
      this.selectedUrl = pageUrl;

      PageService.get( { object_id: page.object_id }, ( ret ) => {
        this.page = ret.content.rendered;
      } );

      this.page = '<img src="loading_icon.gif" alt="Loading..." />';

    };
  }

} )( window.angular, window._ );
