//this is the capmground route section

var express = require ('express');
var route = express.Router();
var Campground = require("../models/campgroundsch");
var middleware = require("../middleware");

//image configuration using cloudinary and multer  .. sources https://github.com/nax3t/image_upload_example
//https://cloudinary.com//documentation/node_integration
var multer     = require("multer");//configuration of the multer for picture upload 
var storage	   = multer.diskStorage({
	filename: function(req, file, callback){
		callback(null, Date.now() + file.originalname);
	}
});

var imagefilter = function(req, file, cb) {
	//tells the user that only image file formats are required
	if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
		return cb(new Error('only image files are allowed'), false);
	}
	cb(null, true);
} ;
var upload = multer({storage: storage, filter: imagefilter});

var cloudinary = require('cloudinary').v2;
cloudinary.config({
	cloud_name: 'moha254',
	api_key: '934657442839282',
	api_secret: 'hA-U4qbIYxTLwqJ34_OUmic6fgM'	
});




//route to displaying all the campgrounds in the index template
route.get("/",middleware.isLoggedIn,function(req,res){	
	if(req.query.search) { //implementing the fuzzy search using regex. although this is not secur..https://stackoverflow.com/questions/38421664/fuzzy-searching-with-mongodb for more details
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Campground.find({name: regex}, function(err, allcampgrounds) {
			if(err) {
				req.flash("error",err.message);
				console.log("error");
			}else {
				
				if(allcampgrounds.length < 1) {
					
					req.flash("error" , " no campground found");
					return res.redirect("back");
					
				} 
					res.render("campground/index", {campgrounds: allcampgrounds});
				
			
			}
		});
	} else {

  Campground.find({}, function(err, allCampgrounds){  	
	if(err){
		console.log(err);
	}else {
		res.render("campground/index", {campgrounds:allCampgrounds});//allcampgrounds used here is the same as the one above
		
	}
});
}
  	
});

	//route that creates a new template
route.post("/",middleware.isLoggedIn,upload.single('image'), function(req,res){ // the image is the image value in the new campgrou form
	cloudinary.uploader.upload(req.file.path,function(err,result) {
		if(err) {
			console.log(err);

		}else {

		// add cloudinary url for the image to the campground object under image property
		req.body.campground.image = result.secure_url;
		//add author to the campground
		req.body.campground.author ={
			id: req.user._id,
			username: req.user.username
		}
		Campground.create(req.body.campground, function(err, campground) {
			if(err) {
				req.flash('error', err.message);
				return res.redirect("back");
			}else {
				res.redirect("/campgroundsites/" + campground._id);
			}
		})
	}
	})
		
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
			req.flash("error", "campground deleted");
			res.redirect("/campgroundsites");
		}
	})
})




//this checks to see if the user is logged in before editing and if he's the correct user is before
//updating or deleting the campground.

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};



module.exports = route;