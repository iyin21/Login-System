var express = require("express");
var router = express.Router();
var User = require("../models/user");
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
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if (err){
			console.log(err);
			req.flash("error", err.message)
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
		req.flash("success", 'You are registered');
		res.redirect("/candy");
		});
			
	});	
});

module.exports = router;