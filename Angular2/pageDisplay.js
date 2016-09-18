( function( angular ) {
  'use strict';

  function PageDisplayController( $location, $rootScope, PageService, $scope ) {
    var ctrl = this;
    ctrl.page = '<img src="loading_icon.gif" alt="Loading..." />';

    $scope.$watch(
      function() {
        return $location.path();
      },
      function( newPath ) {
        ctrl.page = '<img src="loading_icon.gif" alt="Loading..." />';
        var item = $rootScope.$siteData.index[newPath];

        if ( !item ) {
          item = $rootScope.$siteData.index[newPath.slice( 0, newPath.length-1 )];
        }

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
    templateUrl: '/pageDisplay.html',
    controller: PageDisplayController
  } );
} )( window.angular );
