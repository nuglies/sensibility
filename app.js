var app = angular.module('flapperNews', ['ui.router','angularAwesomeSlider']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('slider', {
      url: '/slider/{id}',
      templateUrl: '/slider.html',
      controller: 'slideCtrl'
    })
    .state('posts', {
	  url: '/posts/{id}',
	  templateUrl: '/posts.html',
	  controller: 'PostsCtrl'
	})

    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);

app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){

$scope.post = posts.posts[$stateParams.id];

	$scope.addComment = function(){
	  if($scope.body === '') { return; }
	  $scope.post.comments.push({
		body: $scope.body,
		author: 'user',
		upvotes: 0
	  });
	  $scope.body = '';
	};

}]);

app.controller('MainCtrl', [
'$scope','posts',
function($scope,posts){
  $scope.test = 'Hello world!';
  
	
  $scope.posts = posts.posts;
  $scope.addPost = function(){
  if(!$scope.title || $scope.title === '') { return; }
  $scope.posts.push({title: $scope.title, upvotes: 0});
  $scope.title = "";

	$scope.posts.push({
  title: $scope.title,
  link: $scope.link,
  upvotes: 0,
  comments: [
    {author: 'Joe', body: 'Cool post!', upvotes: 0},
    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
  	]
	});
	};
	
  $scope.incrementUpvotes = function(post) {
  post.upvotes += 1;
  };
}]);

app.factory('posts', [function(){
  var o = {
    posts: [
    {title: 'post 1', upvotes: 5},
  {title: 'post 2', upvotes: 2},
  {title: 'post 3', upvotes: 15},
  {title: 'post 4', upvotes: 9},
  {title: 'post 5', upvotes: 4}
    ]
  };
  return o;
}]);