//this is the capmground route section

var express = require ('express');
var route = express.Router();
var Campground = require("../models/campgroundsch");

//route to displaying all the campgrounds in the index template
route.get("/",isLoggedIn,function(req,res){	
  Campground.find({}, function(err, allCampgrounds){
  	console.log(req.user);
	if(err){
		console.log(err);
	}else {
		res.render("campground/index", {campgrounds:allCampgrounds});//allcampgrounds used here is the same as the one above
		
	}
});

});

	//route that creates a new template
route.post("/", function(req,res){
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

//Takes you to the new template where you have the option of creating a new campground
route.get("/new",isLoggedIn,function(req,res){//this displays the form that should send data to the campgroundesites post
	res.render("campground/new");  //make sure this is declared first before the code below to avoid assumptions

});

//finds the campground by after clicking the show more info and also, includes its comments
route.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,camps){//comments here is the var Comment requires up there
		if(err){
			console.log(err);
		}else {
			
			res.render("campground/show", {campground:camps});
			console.log(camps);
		}
	});	
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login")
}


module.exports = route;