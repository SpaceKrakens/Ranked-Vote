// @TODO move this to a better place instead of the root
var passport = require('passport');
var models = require('./models');
var GitHubStrategy = require('passport-github2').Strategy;
var GITHUB_CLIENT_ID = process.env['GITHUB_CLIENT_ID'];
var GITHUB_CLIENT_SECRET = process.env['GITHUB_CLIENT_SECRET'];
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.

passport.serializeUser(function (user, done) {
    done(null, {id: user.id, token: user.token});
});

passport.deserializeUser(function(obj, done) {
    models.User.findById(obj.id).then(function (user) {
        user.token = obj.token;
        done(null, user);
    });
});


// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET
},
    function (accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's GitHub profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the GitHub account with a user record in your database,
            // and return that user instead.
            profile.token = accessToken;
            return done(null, profile);
        });
    }
));

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
passport.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // have a way to return to the last page the user was on when not authenticated
    // after login is done
    res.redirect('/user/login');
};

module.exports = passport;
