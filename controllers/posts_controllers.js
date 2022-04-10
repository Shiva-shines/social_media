const Post = require('../models/post');

module.exports.create = function(req , res){
     console.log(req.user);
     console.log(req.body);
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err, post){
        if(err){
            console.log('error in creating a post');
        }
        console.log(post);
            return res.redirect('back');
    });
}