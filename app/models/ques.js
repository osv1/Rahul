var mongoose = require("mongoose");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
  var CommentModel = require("./comments");
 var mongoosepages=require('mongoose-pages');

 

var TaskSchema = new Schema({

    
    
     date:Date,
    
     question:String,

     answer:String,

    
    comments: [{
                	type: Schema.Types.ObjectId,
                  ref: "comments"
              }]
    
    
	
});

mongoosepages.skip(TaskSchema);

var task=mongoose.model('tasks', TaskSchema);
module.exports = task;
