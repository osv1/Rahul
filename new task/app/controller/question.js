
var questionModel = require("./../models/ques");
var CommentModel = require("./../models/answer");


exports.getquestion = function(req, res)
{
questionModel.find({}).populate("comments").exec(function(err, ques)
{
   if(err){
      res.json({code: 400, message: "Error occurred"});
    }
  else{

  res.json({code: 200, message: "records found",data:ques});
      }

  })
}
exports.addquestion = function(req, res) {
  var ques = new questionModel(req.body);
  ques.save(function(err) {
    if (err) {
      res.json({
        code: 400,
        message: "error"
      });
    } else {
      res.json({
        code: 200,
        message: "created",
        data: ques
      });

    }
  })
}
exports.getquestionById = function(req, res)
{

questionModel.find({_id:req.params.id}).populate("comments").exec(function(err, ques)
{
   if(err){
      res.json({code: 400, message: "Error occurred"});
    }
  else{

  res.json({code: 200, message: "records found",data:ques});
      }

  })
}
  exports.updatequestion = function(req, res)
{
    
  

   questionModel.update({_id: req.params.id}, { $set: req.body }, function(err, ques)
   {
      if(err)
      {
        res.json({code: 404, message: err});
      }
       else
       {
         res.json({code: 200, data:ques });
        }
    })
  }


    exports.removequestion = function(req, res) {
      
      questionModel.remove({
        _id: req.params.id
      }, function(err, story) {
        if (err) {
          res.json({
            code: 400,
            message: "error"
          });

        } else {
          res.json({
            code: 200,
            message: "removed",
            data: story
          });

        }
      })
    }
    exports.addanswer = function(req, res){
      var comment = new CommentModel(req.body);
      comment.save(function(err){
      questionModel.update({_id: req.params.id}, { $push: {comments: comment} }, function(err, ques){
      if(err){ res.json({code: 404, message: err});
      }else{
              res.json({code: 200, data: ques });
            }
        })
      })
    }
