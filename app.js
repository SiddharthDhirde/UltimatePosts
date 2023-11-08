// Om Namah Shivay

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");


// Authentication requirements
var   User                  = require("./models/user");
var   passport              = require("passport");
var   LocalStrategy         = require("passport-local");
var   methodOverride        = require("method-override");
var   flash                 = require("connect-flash");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(methodOverride("_method"));
app.use(flash());

var mongoose        = require("mongoose");

// Requiring Routes
var commentRoute    = require("./routes/comments"),
    postRoutes      = require("./routes/posts"),
    indexRoutes     = require("./routes/index");
   

// connection string for application code of mongodb atlas
const dotenv = require('dotenv');
dotenv.config();
const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/' ;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// connecting to mongoDB
mongoose.connect(dbURL, connectionParams).then(()=> {
    console.info("Connected to DB");
}).catch((err)=>{
    console.log("Error while connecting to mongoDB:",err);
})


// passport Configuration
app.use(require('express-session')({
    secret: "This is Great",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());  
passport.deserializeUser(User.deserializeUser()); 

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/posts",postRoutes);
app.use("/posts/:id/comments",commentRoute);

//  Start the Server
app.listen(port, ()=>{
    console.log('Server started at http://localhost:3000');
});