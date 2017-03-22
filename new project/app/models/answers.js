var mongoose = require("mongoose");
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var AnswerSchema = new Schema({

    postedby: String,
    answer: String
});
var Answer = mongoose.model('answer', AnswerSchema)
module.exports = Answer;