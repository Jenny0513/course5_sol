(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Premade list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/data/templates/categories.template.html',
    controller: 'CategoriesController as catList',
    resolve: {
      catitems: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories()
          .then(function (response) {
            return response.data;
          })
      }]
    }
  })

  .state('items', {
    url: '/items/{category}',
    templateUrl: 'src/data/templates/items.template.html',
    controller: 'ItemsController as itemList',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.category)
                .then(function (response) {
                  return response.data.menu_items;
                });
            }]

    }
  })

}

})();
