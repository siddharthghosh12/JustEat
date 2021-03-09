const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

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
    },
    restName : {
        type:String
    },
    userName:{
        type:String,
    },
    userAddress:{
        type:String,
    },
    userPhone :{
        type:String,
    },
    delivered:{
        type:Boolean,
        default:false
    },
    status: {
        type:String,
        default:'delivering'
    },
    totalCost :{ 
        type:mongoose.Types.Currency
    },
    createdAt : {
        type:Date,
        default:new Date()
    },
    dishes:[dishSchema]
});

const Orders = mongoose.model('Order',orderSchema);
module.exports = Orders;