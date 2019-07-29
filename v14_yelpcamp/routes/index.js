//this is the authentication and the main root section
var express = require ('express');
var route = express.Router();
var passport = require ('passport');
var Campground = require("../models/campgroundsch");
var user = require ("../models/user");
var middleware = require("../middleware");


route.get("/", function(req,res){
	res.render("landing");
});

route.get ("/signup", function(req, res) {
	res.render("register");
});

route.post ("/register", function(req,res) {

	var newUser = new user ({
		username:req.body.username,
		firstname: req.body.firstname,
		lastname : req.body.lastname,
		email : req.body.email,
		avatar: req.body.avatar
	});
	if(req.body.admincode === 'g23258600') {
			newUser.admin = true;
		}
	user.register (newUser, req.body.password, function(err, user){		
		if (err) {				
			//req.flash("error", err.message);						
			return res.render("register",{error: err.message});
		}else {
		passport.authenticate("local")(req,res, function(){
			req.flash("success","welcome to yelpcamp " + user.username);	
			res.redirect("/");
			console.log("your now registered");
			})
		}
	})

});



route.get ("/login", function(req,res) {
	res.render("login");
});

route.post ("/login",passport.authenticate("local", {	
	successRedirect : "/campgroundsites",
	failureRedirect : "/login"
}) ,function (req,res) {
	req.flash("error","you need to login");
	res.redirect("back");
		
});

route.get ("/logout", function(req,res) {
	req.logout();
	req.flash('success',"Your logged out");
	res.redirect("/");
});

//user profile
route.get("/users/:id" ,middleware.isLoggedIn, function(req, res) {
	user.findById(req.params.id, function(err, userFound) {
		
		if(err) {
			req.flash("error,","the user has not been found");
			res.redirect("/")
		}
	Campground.find().where('author.id').equals(userFound._id).exec(function(err, campgrouns) {
			
			if(err) {
				req.flash("err","there's an error in");
				res.redirect("/");
			}else {
				res.render("users/show", {campgrouns:campgrouns,userFound:userFound});
			}
					
		
		})
		
	})
})

route.get("*", function(req,res){
	res.send("that url doesn't exist");
})

module.exports = route;