const User = require('../models/users');
const passport = require('passport');
const { request } = require('express');

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
    User.findById(req.params.id , function(err , user){
        console.log(user);
        return res.render('profile',{
            title:"Profile",
            profile_user:user

         });

    });
}
module.exports.update = function(req , res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id , req.body , function(err , user){
            return res.redirect('back');
        }); 
    }else{
        return res.status(401).send('Unauthorized');
    }
}
    

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
    req.flash('success' , 'logged-in successfulli !');
return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success' , 'logged-out successfulli !');
    return res.redirect('/');
}

