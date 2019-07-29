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
