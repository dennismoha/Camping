var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Yelpcamps", {useNewUrlParser: true});

var commentSchema = mongoose.Schema({
	text : String,
	author : String
});

//var comment = mongoose.model("comment",commentSchema);


module.exports = mongoose .model("comments", commentSchema);