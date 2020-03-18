var express = require('express');
var router = express.Router();

router.get("/candy", function(req, res){
	res.render("candy",{
		title: "Candy"
	});
});

module.exports=router;