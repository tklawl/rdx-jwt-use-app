const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey; //Get that secretkey from keys.js

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                        if (user) {
                            return done(null, user);
                        }
                        return done(null, false);
                    }
                )
                .catch(err => console.log(err));
        })
    );
};


//Read more on passport w/ the JWT here: https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
//http://www.passportjs.org/packages/passport-jwt/