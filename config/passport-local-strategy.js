const passport = require('passport');
const User = require('../models/users');

const LocalStrategy = require('passport-local').Strategy;

// authentication using passwpord
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        // find a user and establish identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error in finding user');
                return done(err);
            }
            if (!user || user.password != password) {
                console.log('Invalid username/Password');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));


// serializing the user from the key in cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


// deserializing the user from the key in cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding user');
            return done(err);
        }
        return done(null, user);
    });
});

// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
    // if the user is signed in , then pass the request to next function(controller's action )
    if (req.isAuthenticated()) {
        return next();
    }
    // if user is not signed in
    // error is here..............................
    return res.redirect('/users/log-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending 
        // this to the local for the views 
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;