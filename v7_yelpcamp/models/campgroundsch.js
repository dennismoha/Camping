var mongoose = require("mongoose");
var comments = require ("./comments");


mongoose.connect("mongodb://localhost:27017/Yelpcamps", {useNewUrlParser: true});

var campSchema = new mongoose.Schema({
	name: String,
	image : String,
	Description: String,
	comments :[ 
		{
			type: mongoose.Schema.Types.ObjectId,
			ref : "comments"
		}
	]
});



var Campground = mongoose.model("Campground",campSchema);
module.exports = Campground;
//it can also be module.exports = mongoose.mode("campground",campschema);