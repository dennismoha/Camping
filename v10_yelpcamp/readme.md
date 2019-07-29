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
Then taken all the routes from the route app.js folder and added them to their respective route files
Then we've added them to the app.js folder via route path and also app.use, telling express to use them.

NB:
app.use("/campgroundsites",campgroudroutes) ://takes all routes starting with "/campgroundsites" in the campground router and appends them "/campgroundsites" noun automatically. This means we can eliminate "/campgroundsites" in the campground.js file in the routes folders
We can do that for other routes.
In place like the comments section where we have "/campgroundsites/:id/comment",--> the :id/.. <-- ,we
use "mergeParams : true" .  We are merging params from the campground and the id together so that in the comments 
we are able to get the comments with the id. Otherwise we will get a null error.

----> in this version. the name of the author  during the comment is referenced directly from the Users model <---
	This is done in the comment model where the reference model is the user and the user.id

	Seedb has been removed 
	in the comment.create , we need to add the username and the id before saving the comment.
	-> The author field has also been removed

	int the campgroundAuthorize middleware, the equals keyword compares if author. is equal to req.user.id.
	it's more convinient this because  req.user._id is a string and campgroundfound.author.id is an object which is impossible 