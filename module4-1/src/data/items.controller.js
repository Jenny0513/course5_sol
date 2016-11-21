(function () {
'use strict';

angular.module('Data')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['items', 'catName'];
function ItemsController(items, catName) {
  var itemList = this;
  itemList.items = items;
  itemList.catName = catName;
  console.log ("catName in Controller:" + catName)
}

})();
