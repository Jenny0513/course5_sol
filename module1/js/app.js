(function () {
'use strict';
//var MenuText = $scope.LunchMenu.split(',');


angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.LunchMenu = "";
  $scope.sayMessage = "";

  $scope.CheckTooMuch = function () {
    var myDiv = document.getElementById("sayMsg");
    var txtbxClr = document.getElementById("lunch-menu");
    var TxtCounter = 0;

    if ($scope.LunchMenu == "") {
      myDiv.style.color = "red";
      txtbxClr.style.borderColor = "red";
      $scope.sayMessage = "Please enter data first";

    }
    else {

      var TextArray = SplitText($scope.LunchMenu)
      txtbxClr.style.borderColor = "green";
      myDiv.style.color = "green";
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
