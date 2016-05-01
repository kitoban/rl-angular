(function(angular) {
  'use strict';
  function HeroDetailController() {
    this.hero = {
      name: 'IronMan'
    };
  }

  angular.module('heroApp').component('heroDetail', {
    templateUrl: 'heroDetail.html',
    controller: HeroDetailController
  });
})(window.angular);

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
