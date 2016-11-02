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
    var TextArray = SplitText($scope.LunchMenu)
    var myDiv = document.getElementById("sayMsg");
    var txtbxClr = document.getElementById("lunch-menu");

    if (TextArray == "") {
      myDiv.style.color = "red";
      txtbxClr.style.borderColor = "red";
      $scope.sayMessage = "Please enter data first";
    }
    else if (TextArray.length <= 3) {
      txtbxClr.style.borderColor = "green";
       myDiv.style.color = "green";
       $scope.sayMessage = "Enjoy!";
    }
    else if (TextArray.length >3 ) {
      txtbxClr.style.borderColor = "green";
      myDiv.style.color = "green";
      $scope.sayMessage = "Too much";
    };
  };

  function SplitText (string){
    var str = string.split(',')
    return str;
  };
};

})();
