this is the third version  of our project which includes modules and exporting the modules. The comment section has also beeen added

WE HAVE ADDED a new js file called seedb.js and this is it's functions
- Seed data is information that is loaded to enable a function or program to work correctly. 
If a function queries an empty database, for example, it will not produce useful output. 
If the database is "seeded" with data, 
the function will generate meaningful results. Seed data is often used for testing purposes.




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

//NB :
Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s).
So far we've created two Models. Our campgroundsch.js model has its comments field set to an array of ObjectIds. The ref option '(  {
			type: mongoose.Schema.Types.ObjectId,
			ref : "comments"
		})  '  is what tells Mongoose which model to use during population, in our case the comments.js model. All _ids we store here must be document _ids from the comments model.
