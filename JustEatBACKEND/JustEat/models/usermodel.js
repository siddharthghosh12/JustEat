// mongoosem setup
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const passpoortLocalMongoose = require('passport-local-mongoose');

const dishSchema = new Schema({
    name:{
        type:String,
    },
    Price:{
        type:mongoose.Types.Currency,
    },
    Quantity:{
        type:Number,
    },
    Veg:{
        type:Boolean,
    }
})

const orderSchema = new Schema({
    restId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    },
    address:{
        type:String,
    },
    delivered:{
        type:Boolean,
    },
    dishes:[dishSchema]

});

const addressSchema = new Schema({
    title:{
        type:String,
        default:''
    },
    address:{
        type:String,
        default:''
    }
});


const favSchema = new Schema({
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    }
})


//SChema implementation
const userSchema = new Schema({
    email : {
        type:String,
        required: true, 
        unique:true
    },
    name: {
        type:String,
    },
    Phone : {
        type:String,
        unique:true,
    },
    otp:{
        type:String,
        default:''
    },
    otpValid:{
        type:Boolean
    },
    otpCreatedAt:{
        type:Date,
    },
    Address:[addressSchema],
    favourites:[favSchema],
    pastOrders:[orderSchema]
});

userSchema.plugin(passpoortLocalMongoose,{ usernameField:'email'});

// model init
const Users = mongoose.model('User', userSchema);
module.exports = Users;
 