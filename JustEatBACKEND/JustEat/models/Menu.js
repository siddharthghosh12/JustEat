//mongoose stuff
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency=mongoose.Types.Currency;


//Schema implementation
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
    }
});

// model init
const Dishes = mongoose.model('dish',dishSchema);
module.exports=Dishes;
