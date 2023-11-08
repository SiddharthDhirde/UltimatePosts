var express                 = require("express");
var router                  = express.Router();
var Post                    = require("../models/post");
var middleware              = require("../middleware");


// INDEX
router.get('/', (req,res)=> {
    const allPosts = async function(){
        const allPosts = await Post.find();
        res.render("posts/index", {posts: allPosts});
    }
    allPosts();
});

// CREATE
router.post('/', middleware.isLoggedIn, (req,res)=>{
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newPost = {name: name, image: image, description: description, author: author};
    Post.create(newPost).then(()=>{
        res.redirect("/posts");
    }).catch((err)=>{
        console.log("Error while adding new post: ",err);
    }) ;
} );

//NEW
router.get('/new', middleware.isLoggedIn, (req,res)=>{
    res.render('posts/new');    
} );

// SHOW
router.get('/:id',(req,res)=>{
    Post.findById(req.params.id).populate("comments").exec().then((foundPost)=>{
        res.render('posts/show', {post: foundPost});
    }).catch((err)=>{
        console.log("Error while showing Post: ",err);
    })
})


// EDIT POST ROUTE
router.get("/:id/edit", middleware.checkPostOwnership, (req,res)=>{
    Post.findById(req.params.id).then((foundPost)=>{
        res.render("posts/edit", {post: foundPost});
    }).catch((err)=>{
        console.log("Error while finding post (edit route): ",err );
        req.flash("error", "Post not found!")
        res.redirect("/posts");
    });
})

// UPDATE POST ROUTE
router.put("/:id", middleware.checkPostOwnership, (req,res)=>{
    // find and update the correct Post
    Post.findByIdAndUpdate(req.params.id, req.body.post).then(()=>{
        // redirect somewhere (show page)
        res.redirect("/posts/"+ req.params.id);
    }).catch((err)=>{
        console.log("Error while updating post: ", err);
        res.redirect("/posts");
    })

})

// DELETE Post Route
router.delete("/:id", middleware.checkPostOwnership,  (req,res)=>{
    Post.findByIdAndDelete(req.params.id).then(()=>{
        console.log("Post Deleted Seccessfully!");
        req.flash("success", "Post Deleted Successfully");
        res.redirect("/posts/");
     }).catch((err)=>{
        console.log("Error while deleting Post: ", err);
        res.redirect("/posts/");
    });
})




module.exports = router;