(function(angular) {
  'use strict';
  angular.module('heroApp', ['ngComponentRouter'])

  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  })
  .value('$routerRootComponent', 'app')
  .component('app', {
    template:
      '<nav>\n' +
      '  <a ng-link="[\'HeroDetail\']">Hero Detail</a>\n' +
      '  <a ng-link="[\'RealDetail\']">Real Detail</a>\n' +
      '</nav>\n' +
      '<ng-outlet></ng-outlet>\n',
    $routeConfig: [
      {path: '/hero-detail/', name: 'HeroDetail', component: 'heroDetail', useAsDefault: true},
      {path: '/real-detail/', name: 'RealDetail', component: 'realDetail' }
    ]
  });


})(window.angular);

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
