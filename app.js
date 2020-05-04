var express = require("express");
var path = require('path');
var session = require("express-session");
var expressValidator = require("express-validator");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var bodyParser = require("body-parser");
var passportLocalMongoose = require("passport-local-mongoose");
var multer = require("multer");
var mongoose = require("mongoose");
var User = require("./models/user");
var flash = require('connect-flash');
var app = express();

//requiring routes
var indexRoutes = require("./routes/index");
var usersRoute = require("./routes/users");

//setup mongoose
mongoose.connect("mongodb://localhost/authdb", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});
app.use(bodyParser.urlencoded({extended : true}));
//set view engine
app.set('view engine', 'ejs');
//Handle file Uploads
app.use(multer({dest:'./uploads'}).single('profilepicture'));
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
	saveUninitialized: false
}));
//passport Configuration
app.use(passport.initialize());
app.use(passport.session());
//passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, User.authenticate()));
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
app.use(function(req, res, next){
  res.locals.currentUser= req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.errors = req.flash("errors");
  next();
});

app.use(indexRoutes);
app.use(usersRoute);


app.listen(4000, function(){
	console.log("Login System");
})