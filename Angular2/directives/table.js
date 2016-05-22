( function( angular, _ ) {
  'use strict';

  var module = angular.module('kitApp');

  function processTBody( tbody ) {
    var elem = angular.element( '<div></div>' );
    _.each( tbody.childNodes, function( tr ) {
      if ( tr.tagName !== 'TR' ) {
        return;
      }
      elem.append( processTr( tr ) );
    } );
    return elem;
  }

  function processTr( tr ) {
    var elem = angular.element( '<ul></ul>' );
    elem[0].style.display = 'inline';

    _.each( tr.childNodes, function( td ) {
      if ( td.tagName !== 'TD' ) {
        return;
      }
      elem.append( processTd( td ) );
    } );
    return elem;
  }

  function processTd( td ) {
    var elem = angular.element( '<li></li>' );
    elem[0].listStylePosition = 'inside';
    elem[0].style.border = td.style.border;
    elem[0].style.padding = '10px';
    elem[0].style.display = 'inline';
    elem[0].style.textAlign = td.style.textAlign;
    elem[0].style.backgroundColor = td.style.backgroundColor;

    elem.append( td.childNodes );
    return elem;
  }


  module.directive( 'table', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      //require: {
      //  parentCtrl: '?^^kitPageElement'
      //},
      scope: {
      },
      compile: function( elem, attrs ) {

        _.each( Object.keys( attrs.$attr ), function( key ) {
          attrs.$removeClass( key );
        } );

        function postLink( scope, elm, attrs, ctrl, transclude ) {
          transclude( scope, function( clone ) {
            var tbody = _.find( clone, function( i ) {
              return i.tagName === 'TBODY';
            } );

            var replaceValue = processTBody( tbody );
            elm.append( replaceValue );
          } );
        }

        return { post: postLink }
      },
      template: '<div></div>' // ng-transclude
    }
  } );

})( window.angular, window._ );
