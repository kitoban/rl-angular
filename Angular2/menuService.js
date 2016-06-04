( function( angular ) {
  'use strict';

  var module = angular.module('kitApp');

  module.factory( 'MenuService', function( $resource ) {
    var apiRoot = 'http://test.rlsas.co.uk/wp-json/wp-api-menus/v2/menus/6';

    var Menu = $resource( apiRoot );
    return Menu;
  } );

} )( window.angular );
