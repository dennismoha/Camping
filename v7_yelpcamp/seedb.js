var mongoose = require ("mongoose");
var Campground = require("./models/campgroundsch.js");
var Comments  = require ("./models/comments.js");

//create an array that is going to hold the sample data for each campground
//the data here should be simmilar to the one defined for our campground model schema
var data = [ 
	{
		name : "ololoi game",
		image : "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		Description : "this is a very nice place to visits"
	},
	{
		name  : "Samburu game reserve",
		image : "http://www.fkingssafaris.com/images/EwasoNyiroAndSamburuElephants.jpg",
		Description : "this is a cool place to hangout with your fam"
	},
	{
		name : "Nairobi game reserver",
		image : " https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		Description : "this is a very beautiful national park.Although the phrase is nonsense, it does have a long history. The phrase has been used for several centuries by typographers to show the most distinctive features of their fonts. It is used because the letters involved and the letter spacing in those combinations reveal, at their best, the weight, design, and other important features of the typefaces"
	}
];


function seedb() {
	//removed all campgrounds
	Campground.remove({}, function(err, error){
		if(err) {
			console.log("there's error removing items from the database");
		}else {
			console.log("data removal successful");
		}
	},
		data.forEach(function(seed) {
			Campground.create(seed, function(err, data) {
				if (err) {
					console.log("there was an error in the callback function creating the campground");
				} else {
					console.log("successful!!! campground created");

					Comments.create(
						{
							text : "this is a very green area.this is nices",
							author : "dennis mohaa"

						},

						{
							text : "this is the best campground ever",
					author : "melisa writer"

						},

						{
							text : "this is the beginning of the terminator",
							author : "jacob connor"

						}, function (err, data2 ) {
							if (err) {
								console.log("error in inserting a comment");
							}else {
								data.comments.push(data2); //comments here is the array on the campgrouschema
								data.save();
								console.log("comments added succesfully!!!");
							}
						}

				)
				}
			})
		})
	);

	//add a few new campgrounds
	
}

module.exports = seedb; //note that this seeds is as the function