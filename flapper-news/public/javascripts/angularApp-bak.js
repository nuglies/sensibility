var app = angular.module('flapperNews', ['ui.router','angularAwesomeSlider']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('slider', {
      url: '/slider/{id}',
      templateUrl: '/slider.html',
      controller: 'slideCtrl',
      resolve: {
		sensor: ['$stateParams', 'sensorlist', function($stateParams, sensorlist) {
		  return sensorlist.get($stateParams.id);
			}],
		sensorsettings: ['$stateParams', 'sensorlist', function($stateParams, sensorlist) {
		  return sensorlist.getSettings($stateParams.id);
			}],
			
		}
    })
    .state('sensors', {
      url: '/sensors',
      templateUrl: '/sensors.html',
      controller: 'SensorCtrl',
      
      resolve: {
    	postPromise: ['sensorlist', function(sensorlist){
      	
      	return sensorlist.getAll();
    	}]
  	}
  	
  	
  	
    })
    .state('posts', {
	  url: '/posts/{id}',
	  templateUrl: '/posts.html',
	  controller: 'PostsCtrl',
	  resolve: {
		post: ['$stateParams', 'posts', function($stateParams, posts) {
		  return posts.get($stateParams.id);
			}]
		}
	})

    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      
      resolve: {
    	postPromise: ['posts', function(posts){
      	return posts.getAll();
    	}]
  	}
  
    })
    
    
    
    ;

  $urlRouterProvider.otherwise('home');
}]);

app.controller('PostsCtrl', [
'$scope',
'posts',
'post',
function($scope, posts, post){

$scope.post = post;


	$scope.addComment = function(){
	  if($scope.body === '') { return; }
	  posts.addComment(post._id, {
		body: $scope.body,
		author: 'user',
	  }).success(function(comment) {
		$scope.post.comments.push(comment);
	  });
	  $scope.body = '';
	};

}]);


app.controller('SensorCtrl', [
'$scope','$http','sensorlist',
function($scope,$http,sensorlist){
  $scope.test = 'Hello world!';

 $scope.sensorlist = sensorlist.sensors;
 
	
 
 /*
	 $http.get('/sensors').success(function(data){
      console.log("this is inside the controller");
      console.log(data);
    });
  $scope.sensors = [
    	{sensorName: "test", strain: "kush"},
    	{sensorName: "test2", strain: "kush2"}
    ]
*/
  
  $scope.addSensor = function(){
  if(!$scope.sensorName || $scope.sensorName === '') { return; }
  sensorlist.create({
    sensorName: $scope.sensorName,
    strain: $scope.strain,
  });
  $scope.sensorName = '';
  $scope.strain = '';
	};
  
	
	
	
	
	
	
	
}]);

app.controller('MainCtrl', [
'$scope','posts',
function($scope,posts){
  $scope.test = 'Hello world!';
  
	
  $scope.posts = posts.posts;
  
  $scope.addPost = function(){
  if(!$scope.title || $scope.title === '') { return; }
  posts.create({
    title: $scope.title,
    link: $scope.link,
  });
  $scope.title = '';
  $scope.link = '';
	};
  
	
  $scope.incrementUpvotes = function(post) {
  post.upvotes += 1;
  };
}]);





app.factory('sensorlist', ['$http', function($http){

var o = {sensors:[],sensorsettings:[]};

o.get = function(id) {
  return $http.get('/sensors/' + id).then(function(res){
    
    console.log(res.data);
    return res.data;
  });
};

o.getAll = function() {
    return $http.get('/sensors').success(function(data){
      angular.copy(data, o.sensors);
      //console.log("posts data");
      //console.log(data);
    });
  };
  
  o.getSettings = function(id) {
  
   return $http.get('/sensors/'+id+'/sensorsettings/').success(function(data){
      angular.copy(data, o.sensorsettings);
      //console.log("posts data");
      //console.log(data);
    });
  
  };
  
	o.create = function(sensor) {
	  return $http.post('/sensors', sensor).success(function(data){
		o.sensors.push(data);
	  });
	};
	
	
	o.addSettings = function(id, settings) {
  		return $http.post('/sensors/' + id + '/sensorsettings', settings);
	};
	
	o.updateSettings = function(sensor) {
	  return $http.post('/sensors', sensor).success(function(data){
		o.sensors.push(data);
	  });
	}; 
return o;

}]);

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




app.factory('posts', ['$http', function($http){
  var o = {
    posts: [
    ]
  };
  
  o.get = function(id) {
  return $http.get('/posts/' + id).then(function(res){
    return res.data;
  });
};


  o.getAll = function() {
    return $http.get('/posts').success(function(data){
      angular.copy(data, o.posts);
      //console.log("posts data");
      //console.log(data);
    });
  };
  
	o.create = function(post) {
	  return $http.post('/posts', post).success(function(data){
		o.posts.push(data);
	  });
	};  


	o.addComment = function(id, comment) {
  		return $http.post('/posts/' + id + '/comments', comment);
	};
  return o;

}]);


