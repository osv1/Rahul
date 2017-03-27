var mongoose = require("mongoose");
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var AnswerModel = require("./answers");
var taskModel = require("./tasks");
var mongoosepages = require('mongoose-pages');



var quesSchema = new Schema({



    date: {
        type: Date,
        default: Date.now
    },

    questionw: String,

    

    name: { 
        type: ObjectId,
        ref: "tasks"
    },




    answer: [{
        type: ObjectId,
        ref: "answer"
    }]

   


});

mongoosepages.skip(quesSchema);

var question = mongoose.model('ques', quesSchema);
module.exports = question;