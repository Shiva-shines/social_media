
const Post = require('../models/post');
const User = require('../models/users');

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
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        if(err){
            console.log(err);
        }
        User.find({}, function(err , users){
            return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });
        });
    })

}