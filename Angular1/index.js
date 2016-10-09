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
    templateUrl: '/indexTemplate.html',
    $routeConfig: [],
    controller: BaseController
  } );

  function BaseController( MenuService, PageService, $rootRouter, $rootScope, $timeout, $location ) {
    this.menu = [];
    this.testMenu = [];

    MenuService.get( {}, ( menu ) => {

      function getPageLocationInfo( url ) {
        var baseUrlRegex = /^.+?[^\/:](?=[?\/]|$)\//g;
        var fullPath = url.replace( baseUrlRegex, '' );
        if ( fullPath.charAt( fullPath.length - 1 ) === '/' ) {
          fullPath = fullPath.slice( 0, fullPath.length - 1 );
        }
        var pathSplit = fullPath.split( '/' );
        return {
          slug: pathSplit[pathSplit.length - 1],
          location: '/' + fullPath
        };
      }

      function processMenuItem( menuItem, index ) {
        var loactionInfo = getPageLocationInfo( menuItem.url );

        var name = loactionInfo.slug.replace( /-[a-z]/g, normalize );
        name = name[0].toUpperCase() + name.slice( 1, name.length );

        var ret = {
          name: name,
          location: loactionInfo.location,
          slug: loactionInfo.slug,
          id: menuItem.id,
          object_id: menuItem.object_id,
          title: menuItem.title,
          parent: menuItem.parent,
          url: menuItem.url,
          order: menuItem.order,
          children: {}
        };

        _.forEach( menuItem.children, ( subItem ) => {
          addMenuItemToParent( ret.children, index, subItem );
        } );

        return ret;
      }

      function addMenuItemToParent( parent, index, menuItem ) {
        var menuObj = processMenuItem( menuItem, index );
        index[menuObj.location] = menuObj;
        parent[menuObj.slug] = menuObj;
        if ( !parent.orderedRef ) {
          parent.orderedRef = [];
        }
        parent.orderedRef.push( menuObj );
      }

      function buildSiteData( structure, index, menuItems ) {
        _.forEach( menuItems, ( item ) => {
          addMenuItemToParent( structure, index, item );
        } );
      }

      $rootScope.$siteData = {
        index: {},
        structure: {}
      };

      buildSiteData( $rootScope.$siteData.structure, $rootScope.$siteData.index, menu.items );

      buildPages( $rootScope.$siteData.structure, this.menu, '', location );

      var location = $location.path();

      if ( $rootScope.$siteData.index[location] ) {
        var loadedPage = $rootScope.$siteData.index[location];
        var instruction = $rootRouter.generate( [loadedPage.name] );
        $rootRouter.navigateByInstruction( instruction );
      }

      function buildPages( refObj, menu, currentPath ) {
        _.forEach( refObj.orderedRef, ( menuItem ) => {
          var page = buildPage( menuItem, currentPath );
          buildPages( menuItem.children, page.subMenu, currentPath + '/' + menuItem.slug );
          menu.push( page );
        } );
      }

      function normalize( c ) {
        return c[1].toUpperCase();
      }

      function buildPage( menuItem, currentPath ) {
        var routeObj = { path: currentPath + '/' + menuItem.slug + '/', name: menuItem.name, component: 'pageDisplay' };
        console.log( routeObj );
        $rootRouter.registry.config( 'app', routeObj );

        return {
          title: menuItem.title,
          subMenu: [],
          ref: menuItem.name
        };
      }

    } );


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

} )( window.angular, window._ );
