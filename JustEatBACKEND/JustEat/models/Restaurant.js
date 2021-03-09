// mongoose stuff
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

//Dishes schema implementation to be used as array of objects for restaurants
const dishSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    Price : {
        type:mongoose.Types.Currency,
        required:true
    },
    bestSeller : {
        type:Boolean,
        default:false
    },
    mustTry : {
        type:Boolean,
        default:false
    },
    desc : {
        type:String,
        default:' '
    },
    veg :{
        type:Boolean,
        default:true
    },
    image : {
        type:String,
        default:''
    },
    available:{
        type:Boolean
    }
});


// Restaurant schema implementaion
const RestaurantSchema = new Schema({
    name: {
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        default:''
    },
    rating : {
        type:Number
    },
    trademark : {
        type: String,
        required:true
    },
    distance : {
        type: Number
    },
    deliverytime : {
        type:String
    },
    CostFor2 : {
        type:String
    },
    Phone :{
        type:String,
        default:'',
    },
    currentlyOrdering:{
        type:Boolean
    },
    location : {
        type:Object
    },
    dishes:[dishSchema]
})


// model init
const Restaurants = mongoose.model('Restaurant',RestaurantSchema);
module.exports = Restaurants;