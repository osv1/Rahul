var express = require('express');
var router = express.Router();
var path = require('path');
var TaskCtrl = require("./../app/controller/task");


var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var jsonwebtoken = require('jsonwebtoken');
passport.use(new Strategy(
  function(token, callback) {
	jsonwebtoken.verify(token, 'shhhhh', function(err, decoded) {
		if(err){
			console.log(err);
			callback('Invalid token');
		}else{
			console.log(decoded)
			callback(false,decoded);
		}
	});
}));


router.get('/',passport.authenticate('bearer', { session: false }), TaskCtrl.getAlltask);

router.get('/:id',passport.authenticate('bearer', { session: false }),TaskCtrl.updatetask)

router.post('/addtask',passport.authenticate('bearer', { session: false }),TaskCtrl.addtask);

//router.get('/:id/updatetask', TaskCtrl.updatetask);

router.post('/editUser/:id/',passport.authenticate('bearer', { session: false }),TaskCtrl.edittask)

router.delete('/:id', passport.authenticate('bearer', { session: false }),TaskCtrl.deletetask);

router.post('/login',TaskCtrl.login);

router.get('/gt/',TaskCtrl.greater);

router.get('/lt/',TaskCtrl.getMin);

router.get('/max/',TaskCtrl.getMax);

router.get('/avg/',TaskCtrl.getAvg);

router.get('/push/',TaskCtrl.getPushData);

router.get('/sum/',TaskCtrl.getSum);

router.post('/addComment/:id',passport.authenticate('bearer', { session: false }), TaskCtrl.addComment);
router.get('/:id',TaskCtrl.getAtask);


router.get('/populatecomment', TaskCtrl.populatecomment);



module.exports = router;
