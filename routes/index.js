var express = require("express");
var router  = express.Router();
var passport= require("passport");
var User    = require("../models/user");

// HOME PAGE ---> Landing Page (root route)
router.get('/', (req,res)=>{
    res.render("landing");
});


// =============
//  AUTH ROUTE
// =============

// show register form
router.get("/register", (req,res)=>{
    res.render("register");
})

// handle sign up logic
router.post("/register", (req,res)=>{
    var newUser = new User({username: req.body.username}) ;
    User.register(newUser, req.body.password).then((user)=>{
        passport.authenticate("local")(req,res, function(){
            req.flash("success", "Welcome to Ultimate Posts, "+ user.username + '!');
            res.redirect("/posts");
        });
    }).catch((err=>{
        console.log("Error while handling sign up (post): ",err);
        req.flash("error", err.message);
        res.render("register");
    }))
})


// show login page
router.get("/login", (req,res)=>{
    res.render("login");
});

// handle Login Page
router.post("/login", passport.authenticate("local", {
    successRedirect: "/posts", 
    failureRedirect: "/login"
}), (req,res)=>{
    res.send("Welcome")
});


// LOGOUT Route
router.get("/logout", (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      req.flash("success", "Logged Out Successfully!");
      res.redirect("/posts");
    });
});


module.exports = router;