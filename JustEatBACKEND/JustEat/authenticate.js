// import stuff
const passport = require('passport');
const Googlestrategy = require('passport-google-oauth').OAuth2Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const config = require('./config');
const jwt = require('jsonwebtoken');
const Users = require('./models/usermodel');


passport.use(Users.createStrategy())

//token provider
exports.getToken = (user) => {
    return jwt.sign(user,config["secret-key"]);
}


let opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config['secret-key'];

exports.jwtPassport = passport.use(new JWTStrategy(opts,(jwt_payload,done) => {
    Users.findOne({_id:jwt_payload._id},(err,user) => {
        if(err)
            return done(err,false);
        else if(user)
            return done(null,user);
        else
            return done(null,false);
    });
}));

exports.verifyUser = passport.authenticate('jwt',{session:false});


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