//this is the authentication and the main root section
var express = require ('express');
var route = express.Router();
var passport = require ('passport');
var user = require ("../models/user");


route.get("/", function(req,res){
	res.render("landing");
});

route.get ("/signup", function(req, res) {
	res.render("register");
});

route.post ("/register", function(req,res) {

	var newUser = new Users ({username:req.body.username});
	Users.register (newUser, req.body.password, function(err, user){
		if (err) {
			console.log("error in signup");
			console.log(err);
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

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login")
}

route.get("*", function(req,res){
	res.send("that url doesn't exist");
})

module.exports = route;