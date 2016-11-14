(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
NarrowItDownController.$inject = ['MenuSearchService'];

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    }
    //controller: NarrowItDownController,
    //controllerAs: 'list',
    //bindToController: true
  };

  return ddo;
}


function NarrowItDownController(MenuSearchService) {
  var list = this;
  // List of found result
  list.found = [];

  list.getMatchedMenuItems = function () {
    list.found = []
    if (list.searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
      promise.then(function (response) {
        list.found = response;
      })
      .catch(function (error) {
        console.log("Something Wrong");
      });
    }
  };

  list.removeItem = function (itemIndex) {
    list.found.splice(itemIndex, 1);
    if (!list.found.length) {
      list.error = "Nothing found";
    }
  }

}


function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (result) {

      var items = result.data.menu_items;
      var foundItems = []

      for (var i = 0; i < items.length; i++) {
          if (items[i].description.indexOf(searchTerm) != -1) {
                foundItems.push(items[i]);
          }
      }
      return foundItems;

    });
  };
}


})();