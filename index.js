const express = require ('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const app = express();

// reading through the post request
app.use(express.urlencoded());

// setting up the cookie parser
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);

// extract style and script from sub page into the layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts' , true);

// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codial',
    // ToDo change the secret before the deployment 
    secret:'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge : (1000*60*60)
    }
}))

app.use(passport.initialize());
app.use(passport.session());

// use express router
app.use('/' , require('./routes'));




app.listen(port, function(err){
    if(err){
        console.log(`error in running server: ${err}`);
        return;
    }
    console.log(`server is up and running on port: ${port}`);
    
});