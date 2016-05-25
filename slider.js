app.controller('slideCtrl', [
'$scope','sensors',

function ($scope, $filter, sensors) {
	//$scope.sensor = sensors.sensors[$stateParams.id];
    $scope.idPar = "par";			
    $scope.parVal = "800;1380";
    $scope.idBlue = "bluePeak";			
    $scope.parVal = "800;1380";
    $scope.blueVal = 453;
    $scope.disable = function() {
        $scope.disabled = !$scope.disabled;
    };			 

  
    
   
    
    $scope.parOpt = {				
        from: 500,
        to: 2000,
        floor: false,
        step: 1,
        dimension: ' nm',
        vertical: false,
        callback: function(value, elt) {
            console.log(value);
        }				
    };
    
     $scope.blueOpt= {				
        from: 1000,
        to: 100,
        floor: true,
        step: 1,
        dimension: " nm",
        skin: 'blue',
        css: {
            background: {"background-color": "blue"},
            before: {"background-color": "silver"},
            default: {"background-color": "white"},
            after: {"background-color": "silver"},
            pointer: {"background-color": "silver"}
        },
        vertical: true,
        callback: function(value, elt) {
            console.log(value);
        }				
    };

   
    
}
]);





//var app = angular.module('flapperNews', ['angularAwesomeSlider']).controller('slideCtrl', slideCtrl);

app.factory('sensors', [function(){
  var o = {
    sensors: []
  };
  return o;
}]);
