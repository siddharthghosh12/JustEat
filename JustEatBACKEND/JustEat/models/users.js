// mongoosem setup
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//SChema implementation
const userSchema = new Schema({
    name : {
        type:String,
        required: true,
        unique:true
    },
    email: {
        type:String,
        unique:true,
        default: ''
    },
    Phone : {
        type:String,
        unique:true,
        default: ''
    },
    admin : {
        type:Boolean,
        default:false
    },
    googleId:String
});

// model init
const Users = mongoose.model('User', userSchema);
module.exports = Users;
 