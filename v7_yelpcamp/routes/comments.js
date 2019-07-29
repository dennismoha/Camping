//this is the comment Section route
var express    = require ('express');
var route      = express.Router({mergeParams : true}); //check the readme.md
var Campground = require ("../models/campgroundsch");
var Comments   = require ("../models/comments");


route.get("/new",isLoggedIn, function (req,res){
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

//this creates a new comment
route.post("/comment", function(req, res) {
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

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login")
}


module.exports =route;