var mongoose = require("mongoose");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;



var CommentSchema = new Schema({
    _postedby:{type:Number,ref:"tasks"},
    content: String
});

var Comment = mongoose.model('comments', CommentSchema)
module.exports = Comment;

