var mongoose = require("mongoose");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
  // var CommentModel = require("./comments");
 var mongoosepages=require('mongoose-pages');

 

var TaskSchema = new Schema({


     email: String,

     firstName: String,

     lastName: String,

     password: String,

     confirmPassword: String,

     phone:Number
    
	
});

mongoosepages.skip(TaskSchema);

var task=mongoose.model('tasks', TaskSchema);
module.exports = task;
