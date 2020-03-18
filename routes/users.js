var express = require('express');
var router = express.Router();

router.get("/candy", authenticateLogin, function(req, res){
	res.render("candy",{
		title: "Candy"
	});
});

function authenticateLogin(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} 
	res.redirect("/login");
}

module.exports=router;