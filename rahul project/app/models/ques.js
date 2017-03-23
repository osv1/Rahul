var mongoose = require("mongoose");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
  var AnswerModel = require("./answers");
 var mongoosepages=require('mongoose-pages');

 

var quesSchema = new Schema({

    
  
     date:Date,
    
     questionw:String,
     


     

    
    answer: [{
                  type: ObjectId,
                  ref: "answer"
              }]

             

    
    
	
});

mongoosepages.skip(quesSchema);

var question=mongoose.model('ques', quesSchema);
module.exports = question;
