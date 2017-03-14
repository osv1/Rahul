var express = require('express');
var router = express.Router();
var task = require("./task");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/task", task);


/*router.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});*/
module.exports = router;
