
var questionModel = require("./../models/ques");
var AnswerModel = require("./../models/answers");
var taskModel = require("./../models/tasks");
var jsonwebtoken = require('jsonwebtoken');



exports.addquestion = function(req, res) {
  console.log(req.body);
  var ques = new questionModel(req.body);
  ques.name = req.user.id;
  ques.save(function(err,ques){
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

questionModel.findById({_id:req.params.id}).exec(function(err, ques)
{
   if(err){
      res.json({code: 400, message: "Error occurred"});
    }
  else{

  res.json({code: 200, message: "records found",data:ques});
      }

  })
}
     exports.addanswer = function(req, res){
        console.log(req.body);
      var answer = new AnswerModel(req.body);
      answer.nameans = req.user.id;
      answer.save(function(err,answer){
      questionModel.update({_id: req.params.id}, { $push: {answer: answer}}, function(err, ques){
        console.log(err);
      if(err){ res.json({code: 404, message: "err"});
      }else{
              res.json({code: 200, message:"success", data:ques});
            }
        })
      })
    }



exports.populateall = function(req, res){
    questionModel.find({}).populate('answer').populate('name').exec(function(err,ques){
      if(err){
                res.json({code:404,message:"Errors while fetching data"})
            }
       else if(ques && ques.length)
          {
            res.json({code:200,message:"success", data:ques});
          }  
         else{
            res.json("No record found ccdhgbcf");
         }    
    })
  }
 
exports.deletequestion = function(req, res) {
    
    questionModel.remove({
        _id: req.params.id
    }).exec(function(err, ques) {
        if (err) {
            res.json({
                code: 404,
                message: "err"
            })
        } else {
            res.json({
                code: 200,
                message: "Question remove successfully ",
                data: ques
            })
        }
    });
}

exports.populateanswer = function(req, res){

    questionModel.find({_id:req.params.id}).populate('answer').exec(function(err,ques){
      if(err){
                res.json({code:404,message:"Errors while fetching data"})
            }
       else if(ques && ques.length)
          {
            res.json({code:200,message:"success", data:ques});
          }  
         else{
            res.json("No record found ccdhgbcf");
         }    
    })
  }