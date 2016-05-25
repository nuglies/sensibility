app.controller('slideCtrl', [
'$scope','sensorlist','sensor',

function ($scope, $filter, sensorlist,sensor) {
	$scope.sensor = sensorlist;
	console.log(sensorlist);
    $scope.idPar = "par";			
    $scope.parVal = "800;1380";
    $scope.idBlue = "bluePeak";			
    $scope.parVal = "800;1380";
    $scope.blueVal = 453;
    $scope.disable = function() {
        $scope.disabled = !$scope.disabled;
    };			 

  	$scope.addSettings = function(){
	  if($scope.body === '') { return; }
	  sensorlist.addSettings(sensorlist._id, {
		sensorName: $scope.sensorName,
		strain: $scope.strain,
	  }).success(function(settings) {
		$scope.sensor.sensorsettings.push(settings);
	  });
	  $scope.body = '';
	};

      $scope.updateSensorSettings = function(){
		  if(!$scope.growState || $scope.growState === '') { return; }
		  sensorlist.updateSettings({
			growState: $scope.growState
		  });
		  $scope.growState = '';
		  
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



