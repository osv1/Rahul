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



router.get('/auth', passport.authenticate('bearer', { session: false }),TaskCtrl.auth);

router.get('/myaccount',   passport.authenticate('bearer', { session: false }), TaskCtrl.getAtask)

router.get('/ques/:id',TaskCtrl.getAques);

router.get('/', TaskCtrl.getAlltask);

router.get('/contact', TaskCtrl.getAllcontact);

router.get('/:id',TaskCtrl.updatetask)

router.post('/addtask',TaskCtrl.addtask);

router.post('/addcontact',TaskCtrl.addcontact);

router.post('/editUser',passport.authenticate('bearer', { session: false }),TaskCtrl.edittask)

router.delete('/:id',TaskCtrl.deletetask);

router.delete('/contact/:id',TaskCtrl.deletecontact);

router.post('/login',TaskCtrl.login);

router.get('/gt/',TaskCtrl.greater);

router.get('/lt/',TaskCtrl.getMin);

router.get('/max/',TaskCtrl.getMax);

router.get('/avg/',TaskCtrl.getAvg);

router.get('/push/',TaskCtrl.getPushData);

router.get('/sum/',TaskCtrl.getSum);

module.exports = router;
