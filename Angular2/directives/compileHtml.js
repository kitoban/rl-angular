(function(angular) {
  'use strict';

  var module = angular.module('kitApp');

  module.directive( 'compileHtml', function($parse, $sce, $compile) {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {

        var getResult = function () {
          return scope.$eval( attributes.compileHtml );
        };

        scope.$watch(getResult, function (newValue) {
          if (newValue !== '') {
            var linker = $compile(newValue);
            element.empty();
            element.append(linker(scope));
          }
        });
      }
    };
  });

})(window.angular);
