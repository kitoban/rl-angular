( function( angular ) {
  'use strict';

  function PageDisplayController( $location, $rootScope, PageService, $scope ) {
    var ctrl = this;
    ctrl.page = '<img src="loading_icon.gif" alt="Loading..." />';

    // var path = $location.path();
    // var splitPath = path.substring( 1, path.length ).split( '/' );
    // var item = $rootScope.$siteData[splitPath[0]];
    // console.log( 'PageDisplayController' );
    // console.log( item );

    // PageService.get( { object_id: item.object_id }, ( ret ) => {
    //   this.page = ret.content.rendered;
    // } );

    $scope.$watch(
      function() {
        return $location.path();
      },
      function( newPath ) {
        ctrl.page = '<img src="loading_icon.gif" alt="Loading..." />';
        var splitPath = newPath.substring( 1, newPath.length ).split( '/' );
        var item = $rootScope.$siteData[splitPath[0]];
        console.log( 'location update' );
        console.log( item );

        if ( !item ) {
          return;
        }

        PageService.get( { object_id: item.object_id }, ( ret ) => {
          ctrl.page = ret.content.rendered;
        } );
      } );
  }

  angular.module( 'kitApp' ).component( 'pageDisplay', {
    templateUrl: 'pageDisplay.html',
    controller: PageDisplayController
  } );
} )( window.angular );
