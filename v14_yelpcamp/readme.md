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

	//comment section css explanation
		//collapsible glyphicon
		If an element is only visible after some user action, authors MUST set the aria-hidden attribute to true. When the element is presented, authors MUST set the aria-hidden attribute to false or remove the attribute, indicating that the element is visible
		src = "https://www.w3.org/WAI/PF/aria/states_and_properties#aria-hidden"


	use  app.locals.your_custom_var to define app-wide configuration that you might need across multiple files 
	use.res.locals.your_custom_var to define values that you might  need to send to the front-end  on more than one occasion 


//adding admin roles
create a new user object in user.js model 
in the register template add a admin user place
in the index.js route on the register post, make sure you install locus and add it  there.
in the show.ejs template , add  || currentUser && currentUser.admin) {%> in the neede places
 and in the middlewares || req.user.admin ) in the respective places.

 //To add  upload via cloudinary, check the campground.js and multer and cloudinary setup.

 //installing fuzzy search.
 	make sure locus is installed
 	create a form in any of the templates and with method= "get" . This is because get doesn't wrap
 	around the body as done in post but instead presents the data in a query manner. req.query.name.

 	declare the regex function  https://youtu.be/9_lKMTXVk64
 	//implementation of fuzzy search using regex is vulnureable to ddos attacks



//The eval() function evaluates JavaScript code represented as a string.  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
The argument of the eval() function is a string. If the string represents an expression, eval() evaluates the expression. If the argument represents one or more JavaScript statements, eval() evaluates the statements. Do not call eval() to evaluate an arithmetic expression; JavaScript evaluates arithmetic expressions automatically.

If you construct an arithmetic expression as a string, you can use eval() to evaluate it at a later time. For example, suppose you have a variable x. You can postpone evaluation of an expression involving x by assigning the string value of the expression, say "3 * x + 2", to a variable, and then calling eval() at a later point in your script.

If the argument of eval() is not a string, eval() returns the argument unchanged. In the following example, the String constructor is specified and eval() returns a String object rather than evaluating the string.


//for the image upload, we had to install cloudinary
npm install cloudinary and multer
 Multer is Our image upload library. It handles getting formdata from requests

 //creating the user profile.
 index .js route addded the neccessary fields from the register template.
created a new users folder with the show .ejs template for the profle
created a new route with the get property that takes me tothe users folder and the user id
went to the show page template in the user directory and added the show ejs folder

api key AIzaSyCPd7yzlmd1e3aJFMq4isS6aJTChyr7tH0

//google map api
install the dot env for the configuration of the google maps. check the documentation for the installation.
what is dotenv? Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
