(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// LIST #1 - ToBuy controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var ToBuyList = this;

  ToBuyList.items = ShoppingListCheckOffService.getItems();
  ToBuyList.isListEmpty = function() {
    return ToBuyList.items.length == 0;
  }

  ToBuyList.CheckOffItem = function (itemIndex) {
    ShoppingListCheckOffService.addItem(itemIndex);
    ShoppingListCheckOffService.removeItem(itemIndex);
  }

};

// LIST #2 - AlreadyBought controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var BoughtList = this;

  BoughtList.BoughtItems = ShoppingListCheckOffService.getBoughtItems();
  BoughtList.isListEmpty = function() {
    return BoughtList.BoughtItems.length == 0;
  }

};

function ShoppingListCheckOffService() {
  var service = this;

// To Buy List
  var items = [
      {itemName: 'cookies', itemQuantity: 10},
      {itemName: 'milk', itemQuantity: 5},
      {itemName: 'apples', itemQuantity: 6},
      {itemName: 'oranges', itemQuantity: 3},
      {itemName: 'soda', itemQuantity: 2},
      {itemName: 'bread', itemQuantity: 4}
  ];

//Bought List
  var BoughtItems = [];

  service.getItems = function() {
    return items;
  };

  service.getBoughtItems = function() {
      return BoughtItems;
  }

  service.addItem = function (itemIndex) {
    var item = items[itemIndex]
    BoughtItems.push(item);
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };


};

})();
