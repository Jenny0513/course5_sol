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

  ToBuyList.CheckOffItem = function (itemIndex) {
    try {
      ShoppingListCheckOffService.addItem(itemIndex);
      ShoppingListCheckOffService.removeItem(itemIndex);
    } catch (error) {
      ToBuyList.errorMessage = error.message;
    }
  }

};

// LIST #2 - AlreadyBought controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var BoughtList = this;
//  BoughtList.errorMessage = "Nothing bought yet!"
//  try {
    BoughtList.BoughtItems = ShoppingListCheckOffService.getBoughtItems();

//  } catch (error) {
//    BoughtList.errorMessage = error.message;
//  }
};

function ShoppingListCheckOffService() {
  var service = this;

// To Buy List
  var items = [
      {itemName: 'cookies', itemQuantity: 10},
      {itemName: 'bottles of milk', itemQuantity: 5},
      {itemName: 'apples', itemQuantity: 6},
      {itemName: 'oranges', itemQuantity: 3},
      {itemName: 'bottles of soda', itemQuantity: 2}
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
    if (items.length == 0) {
      throw new Error ("Everything is bought!");
      }
  };


};

})();