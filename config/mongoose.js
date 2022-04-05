const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codial_development'); 

const db = mongoose.connection;

db.on('error', console.log.bind('console ,"Error  connecting to database'));

db.once('open', function(){
    console.log('connected to database');
});

module.exports = db;