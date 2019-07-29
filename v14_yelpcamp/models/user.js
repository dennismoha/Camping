var mongoose = require ("mongoose");
var passportLocalmongoose = require ("passport-local-mongoose");

var userSchema = new mongoose.Schema ({
	username : String,
	password : String,
	firstname : String,
	lastname: String,
	email : String,
	avatar : String, 
	admin    :{
		type: Boolean, default: false 
	}
});

userSchema.plugin(passportLocalmongoose); //adds some methods to our user

module.exports = mongoose.model("Users", userSchema);


