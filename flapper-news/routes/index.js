var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Sensor = mongoose.model('Sensor');
var SensorSettings = mongoose.model('SensorSettings');

router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
  });
});

router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});



router.get('/posts/:post', function(req, res) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});

router.get('/posts/:post/comments/:comment', function(req, res) {
  res.json(req.post);
});




router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});



router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

router.post('/posts/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});


router.get('/sensors', function(req, res, next) {

  Sensor.find(function(err, sensors){
    if(err){ return next(err); }

    res.json(sensors);
  });
});

router.post('/sensors', function(req, res, next) {
  var sensor = new Sensor(req.body);

  sensor.save(function(err, sensor){
    if(err){ return next(err); }

    res.json(sensor);
  });
});



router.param('sensor', function(req, res, next, id) {
  var query = Sensor.findById(id);

  query.exec(function (err, sensor){
    if (err) { return next(err); }
    if (!sensor) { return next(new Error('can\'t find sensor')); }

    req.sensor = sensor;
    return next();
  });
});


router.get('/sensors/:sensor', function(req, res) {
 req.sensor.populate('sensorsettings', function(err, sensor) {
    if (err) { return next(err); }

    res.json(sensor);
  });
});


router.get('/sensors/:sensor/sensorsettings', function(req, res) {
  res.json(req.sensor);
});

router.post('/sensors/:sensor/sensorsettings', function(req, res, next) {
  var sensorsettings = new SensorSettings(req.body);
  SensorSettings.sensor = req.sensor;
	
	console.log(sensorsettings);
  sensorsettings.save(function(err, sensorsettings){
    if(err){ 
    console.log(err);
    
    return next(err); 
    }

    req.sensor.sensorsettings.push(sensorsettings);
    req.sensor.save(function(err, sensor) {
      if(err){ return next(err); }

      res.json(sensorsettings);
    });
  });
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;

