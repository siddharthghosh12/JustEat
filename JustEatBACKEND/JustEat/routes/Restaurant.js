// import stuff
const express = require('express');
const bodyParser = require('body-parser');
const Restaurant = require('../models/Restaurant');


// initialization of router 
const restRouter = express.Router();
restRouter.use(bodyParser.json());

//Serving of requests
restRouter.route('/')
.get((req,res,next) => {
    Restaurant.find()
    .then((restaurants) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(restaurants);      
    },err => next(err))
    .catch(err => next(err));
});

restRouter.get('/:restId',(req,res,next) =>{
    Restaurant.findById(req.params.restId)
    .then((restaurant) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(restaurant);
    },err => next(err))
    .catch(err => next(err));
})



module.exports = restRouter;
