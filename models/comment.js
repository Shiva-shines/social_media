const mongoose = require('mongoose');
const { post } = require('../routes');

const commentSchema = new mongoose.Schema({
   content:{
       type:String,
       required:true
   } ,
//    comment belongs to a user
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Users'
},
post:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'POST'
}
},{
    timestamps:true
});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment