//this is the comment Section route
var express    = require ('express');
var route      = express.Router({mergeParams : true}); //check the readme.md
var Campground = require ("../models/campgroundsch");
var Comments   = require ("../models/comments");
var middleware = require("../middleware");



route.get("/new",middleware.isLoggedIn, function (req,res){
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
route.post("/", function(req, res) {
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
					commentCreate.author.username = req.user.username;//attaches each comment with the userame
					commentCreate.author.id = req.user._id;	//attaches each comment with the id of the username
					commentCreate.save(); //saves the above two info
					console.log(commentCreate);				
					console.log("reached the comments.push section again and againa")
					campgroundfound.comments.push(commentCreate);
					campgroundfound.save();					
					res.redirect("/campgroundsites/" + campgroundfound._id);
				}
			});
		}
	});
});

route.get("/:comment_id/edit",middleware.commentUser, function(req, res) {
	Comments.findById(req.params.comment_id, function(err, commentfound) {
		if (err) {
			console.log("error at the comment section");
			res.redirect("back");
		}else {
			res.render("comments/edit",{campground_id: req.params.id, comment: commentfound});
		}
	});
	
});

route.put("/:comment_id",middleware.commentUser,function(req,res) {
	Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, commentupdate) {
		if (err) {
			res.send ("error in comment updating");
			console.log(err);
		}else {
			res.redirect("/campgroundsites/" + req.params.id);
		}
	});	
});

route.delete("/:comment_id",middleware.commentUser, function(req, res) {
	Comments.findByIdAndRemove(req.params.comment_id,function(err) {
		if(err) {
			res.redirect("back");
			console.log("error in removing the comment");
		}else {
			res.redirect("/campgroundsites/" + req.params.id);
		}
	});
});

module.exports =route;