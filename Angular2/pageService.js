( function( angular ) {
  'use strict';

  var module = angular.module('kitApp');

  module.factory( 'PageService', function( $resource ) {
    var apiRoot = 'http://test.rlsas.co.uk/wp-json/wp/v2/pages/';

    var Pages = $resource( apiRoot + ':object_id', { object_id: '@object_id' } );
    return Pages;
  } );
} )( window.angular );
