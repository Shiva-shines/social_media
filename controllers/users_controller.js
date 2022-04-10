const User = require('../models/users');
const passport = require('passport');

module.exports.profile = function(req, res){
    // if(req.cookies.user_id){
    //     User.findById(req.cookies.user_id , function(err, user){
    //         if(user){
    //             return res.render('profile',{
    //                 title:"Profile",
    //                 user:user
    //     })
    // // }
    // return res.redirect('/users/log-in');
    
    // else{
    //     return res.redirect('/users/log-in');
    // }
    return res.render('profile',{
                     title:"Profile",
                     user:req.user
          })}
    

// render sign-in page

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
         res.redirect('/users/profile');
    }
    else{
    
        res.render('users_sign_in',{
        title:"Codial/Sign-in"
    })}
}

// render log-in page


module.exports.logIn = function(req, res){
    if(req.isAuthenticated()){
         res.redirect('/users/profile');
   }
   else{
    return res.render('users_log_in',{
        title:"Codial/Log-in"
    })}
}

// get sign_in data
module.exports.create = function(req, res){
User.findOne({email:req.body.email}, function(err, user){
    if(err){
        console.log('error in finding users in signing up');
        return;
    }
    if(!user){
        User.create(req.body , function(err, user){
            if(err){
                console.log('error in creating user while signing up');
                return;
            }
            return res.redirect('/users/log-in');
        })
    }else{
        return res.redirect('/users/sign-in');
    }
});
}

// get log-in data
module.exports.createSession = function(req, res){
return res.redirect('/users/profile');
}

module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}
