var mongoose = require("mongoose");
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var taskModel = require("./tasks");
var questionModel = require("./ques");
var AnswerSchema = new Schema({

    
    answer: String,
    
    nameans: {
        type: ObjectId,
        ref: "tasks"
    },
    ques_id:{
    	type:ObjectId,
    	ref:"ques"
    }

    
   
});
var Answer = mongoose.model('answers', AnswerSchema)
module.exports = Answer;