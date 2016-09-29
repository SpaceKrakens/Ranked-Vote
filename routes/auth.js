var express = require('express');
var router = express.Router();
var session = require('../session');
var models = require('../models');

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this routerlication at /auth/github/callback
router.get('/github',
    session.authenticate('github', {scope: ['user:email']}),
    function (req, res) {
        // The request will be redirected to GitHub for authentication, so this
        // function will not be called.
    });

module.exports = router;

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/github/callback',
    session.authenticate('github', {failureRedirect: '/user/login'}),
    function (req, res) {
        models.User.findOrCreate({
            where: {
                id: req.user.id
            }
        }).spread(function (user) {
            user.displayName = req.user.displayName;
            user.username = req.user.username;
            user.profileUrl = req.user.profileUrl;
            user.emails = req.user.emails || [];
            user.save();
            res.redirect('/user/account');
        });
    });
