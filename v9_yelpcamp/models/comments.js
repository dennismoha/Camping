var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Yelpcamps", {useNewUrlParser: true});

var commentSchema = mongoose.Schema({
	text : String,
	author :  {
		id : {			 
			type: mongoose.Schema.Types.ObjectId,
			//type : mongoose.Schema.types.ObjectId,
			ref: "user"
		},
		username : String
		
	}

});

//var comment = mongoose.model("comment",commentSchema);


module.exports = mongoose .model("comments", commentSchema);