//this is the capmground route section

var express = require ('express');
var route = express.Router();
var Campground = require("../models/campgroundsch");
var middleware = require("../middleware");

//route to displaying all the campgrounds in the index template
route.get("/",middleware.isLoggedIn,function(req,res){	
  Campground.find({}, function(err, allCampgrounds){  	
	if(err){
		console.log(err);
	}else {
		res.render("campground/index", {campgrounds:allCampgrounds});//allcampgrounds used here is the same as the one above
		
	}
});
  	
});

	//route that creates a new template
route.post("/",middleware.isLoggedIn, function(req,res){
	var name = req.body.name1;
	var image = req.body.image;
	var description = req.body.description;
	var author      = {
						id : req.user._id,
						username : req.user.username
					  }

	var campground =  {name:name, image:image, Description:description, author:author};//the covention for the campgrounds array
	
	Campground.create(campground, function(err, camp){//the campground variable here is the one initialized above their
	if (err){
		console.log("there was an error adding the campground details");
	}else {
		res.redirect("/campgroundsites");
	}
});
		
});

//Takes you to the new template where you have the option of creating a new campground
route.get("/new",middleware.isLoggedIn,function(req,res){//this displays the form that should send data to the campgroundesites post
	res.render("campground/new");  //make sure this is declared first before the code below to avoid assumptions

});

//finds the campground by after clicking the show more info and also, includes its comments
route.get("/:id",middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,camps){//comments here is the var Comment requires up there
		if(err){
			console.log(err);
		}else {
			
			res.render("campground/show", {campground:camps});
			
		}
	});	
});

route.get("/:id/edit",middleware.campgroundAuthorize, function(req, res) {	
			Campground.findById(req.params.id, function(err, campgroundfound) {
			res.render("campground/edit",{campground:campgroundfound});		
	});		
});




route.put("/:id",middleware.campgroundAuthorize,function(req, res) {
	req.body.campground.body = req.sanitize(req.body.campground.body);
												
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatecamps){
		if (err) {
			console.log(err);
			res.send("there's an error in the update section");
		}else {
			res.redirect("/campgroundsites/" + updatecamps.id); //we can also use req.params.id
			console.log(req.body.campground);
			
		}
	});

});

route.delete("/:id",middleware.campgroundAuthorize, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err, foundcamp) {
		if(err){
			console.log("error in removing the campground");
			res.render("campground is unremovable");
		}else {
			res.redirect("/campgroundsites");
		}
	})
})




//this checks to see if the user is logged in before editing and if he's the correct user is before
//updating or deleting the campground.



module.exports = route;