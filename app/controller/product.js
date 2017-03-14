var productm=require("./../models/products");
var mongoosePages=require('mongoose-pages');

exports.getAllproduct = function(req, res)
	{
    
    productm.findPaginated({}, function (err, result) {
    if (err) 
      {
        throw err;
      }
    else{  
          res.json(result);
         } 
}

exports.addproduct = function(req, res){
  var blog = new taskm(req.body);
  blog.save(function(err,blog){
     if(err){ res.json({code: 404, 
      message: "product not inserted" }) }
     else{
       res.json({code: 200, data: blog })
      }
  });


}


exports.updateproduct = function(req, res){
  console.log("updateproduct", req.params.id, req.body); 
 productm.update({_id: req.params.id}, { $set: req.body }, function(err, productm){ 
    if(err){ res.json({code: 404, message: err}) }
     else{
       res.json({code: 200,  message:"product update successfully ",data: productm })
      }
  });
}


exports.deleteproduct = function(req, res){
  console.log("deleteproduct", req.params.id, req.body); 
 productm.remove({}).exec(function(err, productm){ 
    if(err){ res.json({code: 404, message: "err"}) }
     else{
       res.json({code: 200,  message:"product remove successfully ",data: productm })
      }
  });
}

