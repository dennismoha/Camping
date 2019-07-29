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