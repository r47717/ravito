const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ where: {username}})
            .then(function (user) {
                console.log('user: ', user);
                if (!user) {
                    return done(null, false, {message: 'Incorrect username.'});
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {message: 'Incorrect password.'});
                }
                return done(null, user);
            }).catch(function(err) {
                console.log('error: ', err);
                return done(err);
            });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ where: {id} })
        .then(function(user) {
            done(null, user);
        })
        .catch(function(err) {
            done(err);
        });
});


module.exports = passport;