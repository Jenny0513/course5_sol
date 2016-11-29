(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  var savedUserInfo = [];

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getFavDish = function (favdish) {
    return $http.get(ApiPath + '/menu_items/' + favdish + '.json').then(function (response) {
      return response.data;
    });
  };

  service.saveUserInfo = function (user, matchedDish) {
      savedUserInfo = [user.firstname, user.lastname, user.email, user.phone, user.favdish, matchedDish, matchedDish.name, matchedDish.description]
  }

  service.getSavedUserInfo = function () {
    return savedUserInfo;
  }

}


})();
