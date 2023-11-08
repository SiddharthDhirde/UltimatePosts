var express     = require("express");
var router      = express.Router({mergeParams: true});
var Post  = require("../models/post");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");



// New Comments 
router.get("/new", middleware.isLoggedIn, (req,res)=>{

    Post.findById(req.params.id).then((post)=>{
        res.render("comments/new", {post: post});
    }).catch((err)=>{
        console.log("Error while finding post (new comment): ",err);
    })

});

// Create Comments 
router.post("/", middleware.isLoggedIn, (req,res)=>{
    // using id find post
    Post.findById(req.params.id).then((post)=>{
        // Create Comment
        Comment.create(req.body.comment).then((comment)=>{
            console.log("Comment created: ",comment);

            // add username and id to comment
            comment.author.id = req.user._id ; 
            comment.author.username = req.user.username ; 
            // save comment
            comment.save();
            post.comments.push(comment);
            post.save();
            // redirect to show page
            req.flash("success", "Comment added Successfully!")
            res.redirect("/posts/"+ post._id);
        }).catch((err)=>{
            req.flash("error", "Something went wrong!")
            console.log("Error while creating comment: ",err);
        });

    })
})


// Edit Comment ::--->
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req,res)=>{
    Comment.findById(req.params.comment_id).then((foundComment)=>{
        res.render("comments/edit", {post_id: req.params.id, comment: foundComment});
    }).catch((err)=>{
        console.log("Error while editing the comment: ",err);
        res.redirect("/posts/"+ req.params.id);
    })
})

// Update Comment ::-->
router.put("/:comment_id/edit", middleware.checkCommentOwnership, (req,res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment).then(()=>{
        res.redirect("/posts/"+ req.params.id);
    }).catch((err)=>{
        console.log("Error while updating comment: ",err);
        res.redirect("back");
    })
})

// Delete Comment ::-->
router.delete("/:comment_id", middleware.checkCommentOwnership, (req,res)=>{
    Comment.findByIdAndDelete(req.params.comment_id).then(()=>{
        console.log("Comment Deleted Seccessfully!");
        req.flash("success", "Comment Deleted Seccessfully!")
        res.redirect("/posts/" + req.params.id);
    }).catch((err)=>{
        console.log("Error while deleting comment: ", err);
        res.redirect("back");
    })
})



module.exports = router;