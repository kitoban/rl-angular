( function( angular ) {
  'use strict';

  var module = angular.module('kitApp');

  module.factory( 'MenuService', function() {
    return {
      getMenu: function() {
        return {
          id: 4,
          name: 'Left Hand Menu',
          slug: 'left-hand-menu',
          description: '',
          count: 10,
          items: [
            {
              id: 66,
              order: 1,
              parent: 0,
              title: 'Home',
              url: 'http://test.rlsas.co.uk/',
              attr: '',
              target: '',
              classes: '',
              xfn: '',
              description: '',
              object_id: 2,
              object: 'page',
              type: 'post_type',
              type_label: 'Page'
            },
            {
              id: 67,
              order: 2,
              parent: 0,
              title: 'About Us',
              url: 'http://test.rlsas.co.uk/about-us/',
              attr: '',
              target: '',
              classes: '',
              xfn: '',
              description: '',
              object_id: 12,
              object: 'page',
              type: 'post_type',
              type_label: 'Page'
            },
            {
              id: 2018,
              order: 3,
              parent: 0,
              title: 'Competitions',
              url: 'http://test.rlsas.co.uk/competitions/',
              attr: '',
              target: '',
              classes: '',
              xfn: '',
              description: '',
              object_id: 47,
              object: 'page',
              type: 'post_type',
              type_label: 'Page'
            },
            {
              id: 112,
              order: 4,
              parent: 0,
              title: 'Scoring etc.',
              url: 'http://test.rlsas.co.uk/rules/scoring/',
              attr: '',
              target: '',
              classes: '',
              xfn: '',
              description: '',
              object_id: 102,
              object: 'page',
              type: 'post_type',
              type_label: 'Page'
            },
            {
              id: 228,
              order: 5,
              parent: 0,
              title: 'Handicaps etc.',
              url: 'http://test.rlsas.co.uk/handicaps/indoor-handicaps/',
              attr: '',
              target: '',
              classes: '',
              xfn: '',
              description: '',
              object_id: 160,
              object: 'page',
              type: 'post_type',
              type_label: 'Page'
            },
            {
              id: 4626,
              order: 6,
              parent: 0,
              title: 'Coaching Resources',
              url: 'http://test.rlsas.co.uk/coaching-resources/',
              attr: '',
              target: '',
              classes: '',
              xfn: '',
              description: '',
              object_id: 4498,
              object: 'page',
              type: 'post_type',
              type_label: 'Page'
            },
            {
              id: 959,
              order: 7,
              parent: 0,
              title: 'News',
              url: 'http://test.rlsas.co.uk/news/',
              attr: '',
              target: '',
              classes: '',
              xfn: '',
              description: '',
              object_id: 957,
              object: 'page',
              type: 'post_type',
              type_label: 'Page'
            },
            {
              id: 1930,
              order: 8,
              parent: 0,
              title: 'History',
              url: 'http://test.rlsas.co.uk/history/history-of-the-society/',
              attr: '',
              target: '',
              classes: '',
              xfn: '',
              description: '',
              object_id: 182,
              object: 'page',
              type: 'post_type',
              type_label: 'Page'
            },
            {
              id: 3057,
              order: 9,
              parent: 0,
              title: 'Photo Gallery',
              url: 'http://test.rlsas.co.uk/photo-gallery/',
              attr: '',
              target: '',
              classes: '',
              xfn: '',
              description: '',
              object_id: 1040,
              object: 'page',
              type: 'post_type',
              type_label: 'Page'
            },
            {
              id: 2928,
              order: 10,
              parent: 0,
              title: 'Members',
              url: 'http://test.rlsas.co.uk/members/',
              attr: '',
              target: '',
              classes: '',
              xfn: '',
              description: '',
              object_id: 2541,
              object: 'page',
              type: 'post_type',
              type_label: 'Page'
            }
          ],
          meta: {
            links: {
              collection: 'http://test.rlsas.co.uk/wp-json/wp/v2/menus/',
              self: 'http://test.rlsas.co.uk/wp-json/wp/v2/menus/4'
            }
          }
        };
      }
    };
  } );

} )( window.angular );
