app.get("/", function(req,res){
	res.render("landing");
});

//let's get data from our database





//==========>> Authentication routes / signup/login routes <<===============

app.get ("/signup", function(req, res) {
	res.render("register");
});

app.post ("/register", function(req,res) {

	var newUser = new Users ({username:req.body.username});
	Users.register (newUser, req.body.password, function(err, user){
		if (err) {
			console.log("error in signup");
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res, function(){
			res.redirect("/");
			console.log("your now registered");
		})
	})

});

//===========> login portal  <<===========

app.get ("/login", function(req,res) {
	res.render("login")
});

app.post ("/login",passport.authenticate("local", {
	successRedirect : "/campgroundsites",
	failureRedirect : "/login"
}) ,function (req,res) {

});

app.get ("/logout", function(req,res) {
	req.logout();
	res.redirect("/");
});

/*function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}*/

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login")
}