
const Post = require('../models/post');

// render all the post

// module.exports.home = function(req, res){
//      Post.find({}, function(err, posts){
//         return res.render('home',{
//             title:"Home",
//              posts: posts
//     });
    
//     });
//  }

// render post as well as user
module.exports.home = function(req, res){
    Post.find({}).populate('user').exec( function(err, posts){
               return res.render('home',{
                     title:"Home",
                      posts: posts
             });
            });
}