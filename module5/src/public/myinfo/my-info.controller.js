(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MenuService', 'ApiPath'];
function MyInfoController(MenuService, ApiPath) {
  var $ctrl = this;
  $ctrl.user = MenuService.getSavedUserInfo();
  $ctrl.basePath = ApiPath;
}

})();
