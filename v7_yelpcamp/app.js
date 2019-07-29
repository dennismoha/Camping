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

var authentication  = require ("./routes/index");
var campgroudroutes = require ("./routes/campground");
var commentroutes = require ("./routes/comments");



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
});

//NB : The order of how you arrange them here matters. Incase you arrange them wrongly then some routes not going to work
app.use("/campgroundsites",campgroudroutes); //see readme.med
app.use("/campgroundsites/:id/comment",commentroutes);
app.use(authentication);


app.listen(8080);
console.log("the server has started");