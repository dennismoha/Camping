var express = require ('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require ('mongoose');
var Campground = require("./models/campgroundsch.js");
var Comments = require  ("./models/comments.js");

var seedb = require ("./seedb.js"); //we require the file name
seedb();
mongoose.connect("mongodb://localhost:27017/Yelpcamps",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs");


app.get("/", function(req,res){
	res.render("landing");
});

//let's get data from our database


app.get("/campgroundsites", function(req,res){
	
  Campground.find({}, function(err, allCampgrounds){
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

app.get("/campgroundsites/new",function(req,res){//this displays the form that should send data to the campgroundesites post
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

app.get("/campgroundsites/:id/comment/new", function (req,res){
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
					console.log("reached the comments.push section")
					campgroundfound.comments.push(commentCreate);
					campgroundfound.save();
					res.redirect("/campgroundsites/" + campgroundfound._id);
				}
			});
		}
	});
});

app.get("*", function(req,res){
	res.send("that url doesn't exist");
})
app.listen(8080);
console.log("the server has started");