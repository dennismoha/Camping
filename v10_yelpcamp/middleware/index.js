//this is the file that handles all the middleware

var Campground = require ("../models/campgroundsch");
var Comments   = require ("../models/comments");

var middlewareobj = {};
middlewareobj. campgroundAuthorize =function (req, res, next){
	if(req.isAuthenticated()) {  //can't allow edit if not logged in
			Campground.findById(req.params.id, function(err, campgroundfound) {
				if (err) {
					res.redirect("back");// this takes the user back to where he came from.
				}else {
					if(campgroundfound.author.id.equals(req.user._id)) { //check readme.md for equal
						next();
					}else {
						res.redirect("back");
					};				
				}
			});
	}else {
		res.redirect("back");
	}		
}

//middleware that makes sure the comment editor is signed in

middlewareobj.commentUser = function (req, res, next){ //makes sure the one editing a comment is logged in
	if(req.isAuthenticated()) {  //can't allow edit if not logged in
			Comments.findById(req.params.comment_id, function(err, commentfound) {
				if (err) {
					res.redirect("back");// this takes the user back to where he came from.
				}else {
					if(commentfound.author.id.equals(req.user._id)) { //check readme.md for equal
						next();
					}else {
						res.redirect("back");
					};				
				}
			});
	}else {
		res.redirect("back");
	}		
}

//checks to see if the user is logged in
middlewareobj.isLoggedIn = function (req, res, next) {
		if(req.isAuthenticated()) {
			return next();
		}
		res.redirect("/login")
	}

module.exports = middlewareobj;