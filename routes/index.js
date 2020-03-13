var express = require("express");
var router = express.Router();
//var passport = require("passport");

router.get("/", function(req, res){
	res.render("index", {
		title: "Amy's Chatteur"
	});
});

router.get("/register", function(req, res){
	res.render("register", {
		title: "Register"
	});
});
 
router.get("/login", function(req, res){
	res.render("login", {
		title: "Login"
	});
}); 

router.post("/register", function(req, res){
	req.checkBody("password2", "Passwords do not match").equals(req.body.password);
	var newUser = new User({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, username: req.body.username, profilepicture: req.body.profilepicture});
	User.register(newUser, req.body.password, function(err, user){
		if (err){
			req.flash("error", err.message)
			return res.render("register");
		}
		req.flash("success", 'You are registered');
		res.redirect("/");	
	});	
});

module.exports = router;