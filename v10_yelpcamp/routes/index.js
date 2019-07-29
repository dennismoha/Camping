//this is the authentication and the main root section
var express = require ('express');
var route = express.Router();
var passport = require ('passport');
var user = require ("../models/user");
var middleware = require("../middleware");

route.get("/", function(req,res){
	res.render("landing");
});

route.get ("/signup", function(req, res) {
	res.render("register");
});

route.post ("/register", function(req,res) {

	var newUser = new user ({username:req.body.username});
	user.register (newUser, req.body.password, function(err, user){
		if (err) {			
			res.send(err);			
			return res.render("register");
		}
		passport.authenticate("local")(req,res, function(){
			res.redirect("/");
			console.log("your now registered");
		})
	})

});



route.get ("/login", function(req,res) {
	res.render("login")
});

route.post ("/login",passport.authenticate("local", {
	successRedirect : "/campgroundsites",
	failureRedirect : "/login"
}) ,function (req,res) {
		
});

route.get ("/logout", function(req,res) {
	req.logout();
	res.redirect("/");
});

route.get("*", function(req,res){
	res.send("that url doesn't exist");
})

module.exports = route;