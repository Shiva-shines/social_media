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
const MongoStore = require('connect-mongo');


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

// mongo-store is used to store the session cookie in the db
app.use(session({
    name: 'codial',
    // ToDo change the secret before the deployment 
    secret:'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge : (1000*60*60)
    },
    store: new MongoStore({

           mongoUrl:'mongodb://localhost:27017/codial_development',
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
        )
    
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/' , require('./routes'));




app.listen(port, function(err){
    if(err){
        console.log(`error in running server: ${err}`);
        return;
    }
    console.log(`server is up and running on port: ${port}`);
    
});