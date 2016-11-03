(function () {
'use strict';
//var MenuText = $scope.LunchMenu.split(',');


angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.LunchMenu = "";
  $scope.sayMessage = "";
  $scope.myStyle = {};
  $scope.bdrStyle = {};

  $scope.CheckTooMuch = function () {
    var TxtCounter = 0;

    if ($scope.LunchMenu == "") {
      $scope.myStyle = {color: 'red'};
      $scope.bdrStyle = {borderColor: 'red'};
      $scope.sayMessage = "Please enter data first";

    }
    else {

      var TextArray = SplitText($scope.LunchMenu)
      $scope.myStyle = {color: 'green'};
      $scope.bdrStyle = {borderColor: 'green'};

      for(var i=0; i < TextArray.length; i++){
				if(TextArray[i].trim() != ""){
					TxtCounter++;
				}
			}
        if (TxtCounter <= 3) {
          $scope.sayMessage = "Enjoy!";
        }
        else {
          $scope.sayMessage = "Too Much!";
        };

      };
  };

  function SplitText (string){
    var str = string.split(',')
    return str;
  };
};

})();
