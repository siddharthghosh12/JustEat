// import stuff
const passport = require('passport');
const Googlestrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./config');
const jwt = require('jsonwebtoken');
const Users = require('./models/users');


//token provider
exports.getToken = (user) => {
    return jwt.sign(user,config["secret-key"],{expiresIn:3600000});
}


//google authentication strategy
exports.googlePassport = passport.use(new Googlestrategy({
    clientID:config.Google.clientId,
    clientSecret:config.Google.clientSecret
},(accessToken,refreshToken,profile,done) => {
    Users.findOne({googleId : profile.id},(err,user) => {
        if(err)
        {
            return done(err,false);
        }
        else if(!err && user!== null)
        {
            return done(null,user);
        }
        else{
            user = new Users({name : profile.displayName});
            user.googleId = profile.id;
            user.save((err,user) => {
                if(err)
                {
                    return done(err,false);
                }
                else
                    return done(null,user);
            })
        }
    })
}));