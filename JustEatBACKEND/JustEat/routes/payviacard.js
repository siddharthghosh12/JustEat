const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const Users = require('../models/usermodel');
const stripe= require('stripe')(config.STRIPE_KEY)
const PayViaCardRouter = express.Router();

PayViaCardRouter.use(bodyParser.json());

PayViaCardRouter.post('/payViaCard', (req,res,next) => {
    const {amount,email,address} = req.body;
    Users.findOne({email:String(email)})
        .then(async (user) => {
            const paymentIntent = await stripe.paymentIntents.create({
                amount:amount,
                currency:'INR',
            });

            res.status(201).send({
                clientSecret:paymentIntent.client_secret
            })
        })
            .catch(e => console.log('error',e))
});
module.exports =  PayViaCardRouter;

