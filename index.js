const express = require ('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const app = express();

// reading through the post request
app.use(express.urlencoded());

// setting up the cookie parser
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts' , true);

app.use('/' , require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if(err){
        console.log(`error in running server: ${err}`);
        return;
    }
    console.log(`server is up and running on port: ${port}`);
    
});