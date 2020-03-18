var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

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
	// var password = req.body.password;
	// var password2 = req.body.password2;
	// var password = req.body.password;
	// var password2 = req.body.password2;
	req.checkBody("password2", "Passwords do not match").equals(req.body.password);
	var errors= req.validationErrors();
	// req.assert('password2', 'Password and Confirm Password should be same.').equals(req.body.password);
	// var mappedErrors = req.validationErrors(true);
	// if(req.files.profilepicture){
	// 	var profilePictureOriginalName = req.files.profilepicture.OriginalName
	// 	var profilePictureName 		 = req.files.profilepicture.name;
	// 	var profilePictureMine		 = req.files.profilepicture.mimetype;
	// 	var profilePictuePath		 = req.files.profilepicture.path;
	// 	var profilePictureExt		 = req.files.profilepicture.extension;
	// 	var profilePictureSize		 = req.files.profilepicture.size;
	// }else{
	// 	var profilePictureName = 'noimage.png';
	// }
	//var newUser = new User({username: req.body.username, email: req.body.email, profilepicture: req.body.profilepicture});
	if(errors){
    	res.render('register', {
      		errors: errors
    	});
  	}else {
    	var newUser = new User({
      		name: req.body.name,
      		username: req.body.username,
      		email: req.body.email,
      		profilepicture: req.body.profilepicture
    	});
		User.register(newUser, req.body.password, function(err, user){
			if (err){
				console.log(err);
				req.flash("error", err.message) 
			}
			passport.authenticate("local")(req, res, function(){
				req.flash("success", 'You are registered');
				res.redirect("/candy");
			});
				
		});	
	}

});
router.post("/login", passport.authenticate("local", {
	successRedirect: "/candy",
	failureRedirect: "/login"
}),	function(req,res){

});

module.exports = router;