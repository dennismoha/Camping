var express = require ('express');
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require ("method-override");
var mongoose = require ('mongoose');
var passport = require ("passport");
var passportLocal = require ("passport-local");
var passportLocalmongoose = require ("passport-local-mongoose");
var Campground = require("./models/campgroundsch.js");
var Comments = require  ("./models/comments.js");
var Users = require("./models/user")

var seedb = require ("./seedb.js"); //we require the file name
seedb();
mongoose.connect("mongodb://localhost:27017/Yelpcampsv6",{ useNewUrlParser: true });
app.use(require("express-session")({
	secret: "this is the authentication string",
	resave : true,
	saveUninitialized : false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
//passport.serializeUser(Users.serializeUser());
passport.serializeUser(Users.serializeUser()); //used to store id of the user in the session
passport.deserializeUser(Users.deserializeUser()); //used to retrieve the user details of the user by fetching the id from the session and then fetching the whole user details from your database.
passport.use(new passportLocal(Users.authenticate())); //authenticate also comes with the passportLocalmongoosee. you can also write your authenticate function

app.use(function(req,res,next) {
	res.locals.currentUser = req.user; //req.user is empty if no one signed in else contains username and id of the user
	next();
})

app.get("/", function(req,res){
	res.render("landing");
});

//let's get data from our database


app.get("/campgroundsites",isLoggedIn,function(req,res){
	
  Campground.find({}, function(err, allCampgrounds){
  	console.log(req.user);
	if(err){
		console.log(err);
	}else {
		res.render("campground/index", {campgrounds:allCampgrounds});//allcampgrounds used here is the same as the one above
		
	}
});

});

app.post("/campgroundsites", function(req,res){
	var name = req.body.name1;
	var image = req.body.image;
	var description = req.body.description;
	var campground =  {name:name, image:image, Description:description};//the covention for the campgrounds array
	Campground.create(campground, function(err, camp){//the campground variable here is the one initialized above their
	if (err){
		console.log("there was an error adding the campground details");
	}else {
		res.redirect("/campgroundsites");
	}
});
		
});

app.get("/campgroundsites/new",isLoggedIn,function(req,res){//this displays the form that should send data to the campgroundesites post
	res.render("campground/new");  //make sure this is declared first before the code below to avoid assumptions

});



app.get("/campgroundsites/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,camps){//comments here is the var Comment requires up there
		if(err){
			console.log(err);
		}else {
			
			res.render("campground/show", {campground:camps});
			console.log(camps);
		}
	});	
});

//this is the comment Section

app.get("/campgroundsites/:id/comment/new",isLoggedIn, function (req,res){
	//find a campground by it's id

	Campground.findById(req.params.id, function (err, foundcamps ){
		if (err) {
			console.log("identified an error when looking for campgrounds");
			console.log(err);
		}else {
			res.render("comments/new", {campground : foundcamps});
			console.log ("found the campground");
		}
	});
	
});

app.post("/campgroundsites/:id/comment", function(req, res) {
	//in this section we aim to find campground using id, create a new comment and connect it to the campground
	//and redirect it to show page

	Campground.findById(req.params.id, function(err, campgroundfound) { //looks for the campground with the id
		if (err) {
			console.log(err);
			res.send("error finding the campground")
		} else {

			Comments.create(req.body.comment, function(err, commentCreate) {
				if (err) {
					console.log(err);
					res.send ("there was an error creating the comment");
				}else {
					console.log(req.body.comment);
					console.log("reached the comments.push section")
					campgroundfound.comments.push(commentCreate);
					campgroundfound.save();
					res.redirect("/campgroundsites/" + campgroundfound._id);
				}
			});
		}
	});
});

//==========>> Authentication routes / signup/login routes <<===============

app.get ("/signup", function(req, res) {
	res.render("register");
});

app.post ("/register", function(req,res) {

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

//===========> login portal  <<===========

app.get ("/login", function(req,res) {
	res.render("login")
});

app.post ("/login",passport.authenticate("local", {
	successRedirect : "/campgroundsites",
	failureRedirect : "/login"
}) ,function (req,res) {

});

app.get ("/logout", function(req,res) {
	req.logout();
	res.redirect("/");
});

/*function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}*/

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login")
}


app.get("*", function(req,res){
	res.send("that url doesn't exist");
})
app.listen(8080);
console.log("the server has started");