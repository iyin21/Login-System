var express = require("express");
var session = require("express-session");
var expressValidator = require("express-validator");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var bodyParser = require("body-parser");
var passportLocalMongoose = require("passport-local-mongoose");
var multer = require("multer");
var mongoose = require("mongoose");
var flash = require('connect-flash');
var app = express();

//requiring routes
var indexRoutes = require("./routes/index");
//var usersRoute = require("./routes/users");

//setup mongoose
//mongoose.connect("mongodb:/localhost/authdb", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
app.use(bodyParser.urlencoded({extended : true}));
//set view engine
app.set('view engine', 'ejs');
//Handle file Uploads
app.use(multer({dest:'./uploads'}).single('photo'));
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(function(req, res, next){
	res.locals.messages = require('express-messages')(req, res);
	next();
});
//handle express session
app.use(session({
	secret: "I love you",
	resave: false,
	saveUninitialized: true
}));
//passport Configuration
app.use(passport.initialize());
app.use(passport.session());
//validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(flash());

app.use(indexRoutes);
//app.use(usersRoutes);


app.listen(3000, function(){
	console.log("Login System");
})