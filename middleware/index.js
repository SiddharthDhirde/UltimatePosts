var Post = require("../models/post");
var Comment    = require("../models/comment");


var middlewareObject = {};

// Check user is Log in or not
middlewareObject.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) {
        // The user is logged in
        return next();
    }
    else {
        // The user is logged out
        req.flash("error", "Please Login to continue!");
        res.redirect('/login');
    }
}

// Check Ownership for Post
middlewareObject.checkPostOwnership = function(req, res, next){
    // is user logged in?
    if(req.isAuthenticated()) {
        Post.findById(req.params.id).then((foundPost)=>{
            // does user own the Post?
            if(foundPost.author.id.equals(req.user._id)){
                next();
            }
            else{
                req.flash("error", "Sorry, Only Author have permission to make changes!")
                res.redirect("back");
            }
        }).catch((err)=>{
            console.log("Error while finding Post (edit route): ",err );
            req.flash("error", "Post not found!")
            res.redirect("back");
        });  

    } else{
        req.flash("error", "Please Login to continue!")
        res.redirect("back");
    }
}

// Check Ownership for Comment
middlewareObject.checkCommentOwnership = function(req, res, next){
    // is user logged in?
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id).then((foundComment)=>{
            // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)){
                next();
            }
            else{
                req.flash("error", "Sorry, Only Author have permission to make changes!")
                res.redirect("back");
            }
        }).catch((err)=>{
            console.log("Error while finding comment (edit route): ",err );
            res.redirect("back");
        });  

    } else{
        req.flash("error", "Please Login to continue!")
        res.redirect("back");
    }
}



module.exports = middlewareObject;