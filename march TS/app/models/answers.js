var mongoose = require("mongoose");
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    var taskModel = require("./tasks");
var AnswerSchema = new Schema({

 
    answer: String,
    
    nameans: {
        type: ObjectId,
        ref: "tasks"
    }

    
   
});
var Answer = mongoose.model('answer', AnswerSchema)
module.exports = Answer;