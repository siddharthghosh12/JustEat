// import stuff
const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/users');

//express stuff
const userRouter = express.Router();
userRouter.use(bodyParser.json());

//serving requests
userRouter.route('/')
.get((req,res,next) => {
  Users.find()
  .then((users) => {
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(users);
  },err => next(err))
  .catch(err => next(err));
})



module.exports = userRouter;

