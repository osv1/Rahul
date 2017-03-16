var taskm=require("./../models/tasks");
var mongoosePages=require('mongoose-pages');
var CommentModel = require("./../models/comments");
var jsonwebtoken = require('jsonwebtoken');


	exports.getAlltask = function(req, res)
	{
    //var docsPerPage=2;
   // var pageNumber=req.query.pageno;
    taskm.find({}).exec(function (err, result) {
    if (err) 
      {
        res.json({code:400,message:"error"})
      }
    else{  
          res.json({code:200,message:"save", data:result})
         } 
//}, docsPerPage, pageNumber); // pagination options go here

});
  }

exports.auth=function(req,res)
{
  res.json({code:200, message:"ok"});
}


exports.getAtask = function(req, res)
  {
    console.log(req.user);
    var id=req.user.id;
    taskm.findById({"_id":id}).exec(function (err, result) {
    if (err) 
      {
        res.json({code:400,message:"error"})
      }
    else{  
          res.json({code:200,message:"save", data:result})
         } 


});
  }

exports.addtask = function(req, res){
  var blog = new taskm(req.body);
  blog.save(function(err,blog){
     if(err){ 
       console.log(err);
      res.json({code: 404, message: "task not inserted" }) }
     else{
       res.json({code: 200, data: blog })
       console.log("register successfully");
      }
  });


}
exports.edittask = function(req, res){
 taskm.update({'_id': req.user.id}, { $set: req.body }).exec (function(err, taskm){ 
    if(err){ res.json({code: 404, message: err}) }
     else{
       res.json({code: 200,  message:"task update successfully ",data: taskm })
      }
  });
}




exports.updatetask = function(req, res){
  var id=req.user.id;
 taskm.findById({'_id':id}).exec (function(err, taskm){ 
    if(err){ res.json({code: 404, message: err}) }
     else{
       res.json({code: 200,data: taskm })
      }
  });
}


exports.deletetask = function(req, res){
  console.log("deletetask", req.params.id, req.body); 
 taskm.remove({_id:req.params.id}).exec(function(err, taskm){ 
    if(err){ res.json({code: 404, message: "err"}) }
     else{
       res.json({code: 200,  message:"task remove successfully ",data: taskm })
      }
  });
}


exports.greater= function(req,res){

taskm.find({age: {$gte:req.params.age}},function(err,age)
 {
   if(err)
    {
    res.json({code:404,message:"no data found" })
   } else{
      res.json({
        "Total count":age
      });
    }
  });
 }

 exports.less= function(req,res){

taskm.find({age: {$lte:req.params.age}},function(err,age)
 {
   if(err)
    {
    res.json({code:404,message:"no data found" })
   } else{
      res.json({
        "Total count":age
      });
    }
  });
 }
 exports.getMin=function(req,res)
 {
  taskm.aggregate([{$group:{id:"age",lowestRating:{$min:"$age"}}}]).exec(function(err,taskm)
  {
    if(err)
    {
      res.json({code: 404})
    }else{
      res.json({code:200})
    }
  });
 }

 exports.getAvg=function(req,res)
 {
  taskm.aggregate([{$group:{id:"age",avg:{$avg:"$age"}}}]).exec(function(err,taskm)
  {
    if(err)
    {
      res.json({code: 404})
    }else{
      res.json({code:200})
    }
  });
 }

 exports.getPushData=function(req,res)
 {
  taskm.aggregate([{$group:{id:"age",push:{$push:"$age"}}}]).exec(function(err,taskm)
  {
    if(err)
    {
      res.json({code: 404})
    }else{
      res.json({code:200})
    }
  });
 }
exports.getMax=function(req,res)
 {
  taskm.aggregate([{$group:{id:"age",age:{$max:"$age"}}}]).exec(function(err,taskm)
  {
    if(err)
    {
      res.json({code: 404})
    }else{
      res.json({code:200})
    }
  });
 }

 exports.getSum=function(req,res)
 {
  taskm.aggregate([{$group:{id:"age",age:{$sum:"$age"}}}]).exec(function(err,taskm)
  {
    if(err)
    {
      res.json({code: 404})
    }else{
      res.json({code:200})
    }
  });
 }

 exports.addComment = function(req, res){
  var comment = new CommentModel(req.body);
  comment.save(function(err,comment){
  taskm.update({_id: req.params.id}, { $push: {comments: comment} }, function(err, taskm){
  if(err){
           res.json({code: 404, message: err})
         }
  else  {
          res.json({code: 200, data: taskm })
        }
    })  
  })
}

exports.populatecomment = function(req, res){
    taskm.find({}).populate('comments').exec(function(err,comment){
      if(err){
                res.json({code:404,message:"Errors while fetching data"})
            }
       else if(comment && comment.length)
          {
            res.json({code:200,data:comment});
          }  
         else{
            res.json("No record found");
         }    
    })
  }

exports.login=function(req,res){
  taskm.findOne({"email":req.body.email,"password":req.body.password}).populate("comments").exec(function(err,employee)
  {
            if(err)
                   {
                     res.json({code:400,message:"data not found"});
                    }                     
                          if(employee)
                          {
                           var payload = {
                                         id : employee._id
                                         };
                             console.log("payload",payload);
                            
                             var token = jsonwebtoken.sign(payload, 'shhhhh');
              
                             console.log("token",token);

                          res.json({code:200,message:"login successfully", data:{token:token}})
                           console.log("login successfully");
                          }

                         else
                          {
                           res.json({code:404,message:"password incorrect"})
                           console.log("password incorrect");
                          }
});

}
