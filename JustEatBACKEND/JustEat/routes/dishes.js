// import stuff
const express = require('express');
const bodyParser = require('body-parser');
const Dishes = require('../models/Menu');

// express init 
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

// serving requests
dishRouter.get('/',(req,res,next) => {
    Dishes.find()
    .then((dishes) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes);
    },err => next(err))
    .catch(err => next(err));
});

dishRouter.get('/bestseller',(req,res,next) => {
    Dishes.find({bestSeller:true})
    .then((dishes) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes);
    },err => next(err))
    .catch(err => next(err));
});


module.exports = dishRouter;