(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService'];
function SignupController(MenuService) {
  var reg = this;

  reg.submit = function () {
    reg.completed = true;
    reg.errortxt = true;
    var matchedDish = [];

    var promise = MenuService.getFavDish(reg.user.favdish);

    promise.then(function (response) {
      reg.errortxt = false;
      matchedDish = response;
      MenuService.saveUserInfo(reg.user, matchedDish);
    })
    .catch(function (error) {
      reg.errortxt = true;
      console.log("Something went terribly wrong.");
    });

  };

}

})();
