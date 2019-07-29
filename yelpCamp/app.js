var express = require ('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require ('mongoose');
mongoose.connect("mongodb://localhost:27017/Yelpcamps",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs");

var campSchema = new mongoose.Schema({
	name: String,
	image : String,
	Description: String
});



var Campground = mongoose.model("Campground",campSchema);


app.get("/", function(req,res){
	res.render("landing");
});

//let's get data from our database


app.get("/campgroundsites", function(req,res){
	
  Campground.find({}, function(err, allCampgrounds){
	if(err){
		console.log(err);
	}else {
		res.render("index", {campgrounds:allCampgrounds});//allcampgrounds used here is the same as the one above
		
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
	res.render("new");  //make sure this is declared first before the code below to avoid assumptions

});

app.get("/campgroundsites/:id", function(req, res){
	Campground.findById(req.params.id, function(err,camps){
		if(err){
			console.log(err);
		}else {
			res.render("show", {campground:camps});
		}
	});

	
});

app.get("*", function(req,res){
	res.send("that url doesn't exist");
})
app.listen(8080);
console.log("the server has started");