var mongoose = require("mongoose");
const comment = require("./comment");

var postSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: "Comment"            
        }
    ]
})
// var Post = mongoose.model("Post",postSchema);

module.exports = mongoose.model("Post",postSchema);