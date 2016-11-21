(function () {
'use strict';

angular.module('Data')
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['catitems'];
function CategoriesController(catitems) {
  var catList = this;
  catList.items = catitems;
}

})();
