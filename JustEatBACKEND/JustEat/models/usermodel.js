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
    OrderId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    restName:{
        type:String,
    },
    address:{
        type:String,
    },
    delivered:{
        type:Boolean,
        default:false
    },
    orderStatus : {
        type:String,
        default:'Delivering'
    },
    totalCost :{ 
        type:mongoose.Types.Currency
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
    },
    save_as_current:{
        type:Boolean,
        default:false
    }
});


const favSchema = new Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId
    },
    name:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:''
    },
    trademark:{
        type:String,
        default:''
    },
    CostFor2:{
        type:String
    },
    rating:{
        type:Number
    },
    touched:{
        type:Boolean
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
 