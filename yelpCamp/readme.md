this is the second version of our project which includes addition of the mongodb
all data about the campground is gotten from the database unlike the version one where we were getting it 
from the array.

It includes the following:
var express = require ('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require ('mongoose');
mongoose.connect("mongodb://localhost:27017/Yelpcamps",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));


db.collection.drop();//drop all the data in a collection

app.set("view engine", "ejs");

//
In this section..the restful routing is also introduced
the following pattern /convention should be followed:
	
name        url                   Verb                Desc
Index     /dogs                 GET          T
New       /dogs/new            Get             Displays form to make a new dog
Create    /dogs               Post             Add new dog to DB
Show     /dogs/: id            GET       shows info about one dog

in the Database Schema..The description variable was added 