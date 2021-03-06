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
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function FoundItemsDirectiveController() {
  var list = this;

}

function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm = "";
  // List of found result
  menu.found = [];
  menu.foundtxt = true;

  menu.getMatchedMenuItems = function () {
    if (menu.searchTerm.length > 0) {
      var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
      promise.then(function (response) {
        menu.found = response;
        menu.foundtxt = false;
      })
      .catch(function (error) {
        console.log("Something Wrong");
      });
    } else {
      menu.found = [];
    }
  };

  menu.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
    menu.foundtxt = true;
  }

}


function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (result) {

      foundItems = [];
      var menu_items = result.data.menu_items;
      var lowerCaseTerm = searchTerm.toLowerCase();

      for (var i = 0; i < menu_items.length; i++) {
          if (menu_items[i].description.toLowerCase().indexOf(lowerCaseTerm) != -1) {
                foundItems.push(menu_items[i]);
          }
      }
      return foundItems;

    });
  };

  service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex, 1);
  };

}


})();
