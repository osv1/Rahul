var express = require('express');
var router = express.Router();
var path = require('path');
var ProductCtrl = require("./../app/controller/product");

router.get('/', ProductCtrl.getAllproduct);

router.post('/addproduct', ProductCtrl.addproduct);

router.put('/:id/updateproduct', ProductCtrl.updateproduct);

router.delete('/:id/deleteproduct', ProductCtrl.deleteproduct);

module.exports = router;
