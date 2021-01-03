// import stuff
const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/usermodel');
const passport = require('passport');
const authenticate = require('../authenticate');
const twilio = require('../twilio');


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
});

userRouter.post('/register',(req,res,next) => {
  Users.findOne({$or:
  [
    {email:req.body.email},
    {Phone : req.body.Phone} 
  ]}).then((user) => {
    if(user!==null)
    {
      res.status = 401,
      res.setHeader('Content-Type','application/json');
      res.send('User with same email and Phone already exists');
    }
    else{
      Users.register(new Users({email:req.body.email}),
        req.body.password, (err,user) => {
          if(err)
          {
            res.status=500;
            res.setHeader('Content-Type','application/json');
            res.json({error:err});
          }
          else
          {
            if(req.body.name)
              user.name=req.body.name;
            if(req.body.Phone)
              {
                const phone = String(req.body.Phone).replace(/[^\d]/g,'');
                user.Phone = phone;
              }
            user.save((err,user) => {
              if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
                return ;
              }
              passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true, status: 'Registration Successful!'});
              });
            })
          }
        })
    }
  })
  .catch(err => console.log(err));
});

userRouter.post('/login',(req,res,next) => {
  const  phone = String(req.body.Phone).replace(/[^\d]/g,'');
  Users.findOne({Phone:phone})
    .then(user => {
      if(user === null)
        return res.status(422).send('You must have an account to logIn');
      else{
        const code = Math.floor((Math.random()*899999 + 100000));
        twilio.messages.create({
          body :`Your One Time Password is ${code}. Use this to login to your JustEat account`,
          to   : '+' + phone,
          from : '+12052367227'
        },(err) => {
          if(err)
            return res.status(422).send(err);
          else 
          {
            user.otp = code.toString();
            user.otpValid = true;
            user.otpCreatedAt = new Date();
            user.save((err,user) => {
              if(err)
              {
                res.statusCode=500;
                res.setHeader('Content-Type','application/json');
                res.send(err);
              }
              else {
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json({success:true});
              }
            })
          }
        })
      }
    })
});

userRouter.post('/verifyotp',(req,res,next) => {
  const phone = String(req.body.Phone).replace(/[^\d]/g,'');
  Users.findOne({Phone:phone})
    .then(user => {
      const code = req.body.otp.toString();
      if(user.otp !== code || !user.otpValid )
      {
        return res.status(422).send({error : 'Code is not Valid'});
      }
      user.otp = '';
      user.otpValid = false;
      user.save((err,user) => {
        if(err)
        {
          return res.status(422).send({error:err});
        }
        else{
          var token = authenticate.getToken({_id: user._id})
          res.statusCode=200;
          res.setHeader('Content-Type','application/json');
          res.json({success:true,status:'Login Successful',token:token});
        }
      })
    })
})



module.exports = userRouter;

