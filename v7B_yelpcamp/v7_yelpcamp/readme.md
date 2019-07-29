this is the third version  of our project which includes modules and exporting the modules. The comment section has also beeen added

WE HAVE ADDED a new js file called seedb.js and this is it's functions
- Seed data is information that is loaded to enable a function or program to work correctly. 
If a function queries an empty database, for example, it will not produce useful output. 
If the database is "seeded" with data, 
the function will generate meaningful results. Seed data is often used for testing purposes.

in the version 6..
we have added the login and signup routes where users can signup and login
the signup is a bit different from the process in node_authentication code where by, we have narrowed down processes 
eg. the req.body.username is stored in   a variable and used in users.new() unlike the other one where they were listed
also all passport modules have been added:
	npm install passport passport-local passport-local-mongoose express-session --save
	



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

//This is the version 7
We've introudced the routes folder with the campground.js, index.js and comments. js
