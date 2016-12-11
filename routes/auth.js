var express = require('express');
var router = express.Router();
var session = require('../session');
var models = require('../models');
var importer = require('../models/importer/project');

/*
 GET /auth/github
 Use passport.authenticate() as route middleware to authenticate the
 request.  The first step in GitHub authentication will involve redirecting
 the user to github.com.  After authorization, GitHub will redirect the user
 back to this routerlication at /auth/github/callback
 */
router.get('/github',
    session.authenticate('github', {scope: ['user:email']}),
    function (req, res) {
        // The request will be redirected to GitHub for authentication, so this
        // function will not be called.
    });

/*
 GET /auth/github/callback
 Use passport.authenticate() as route middleware to authenticate the
 request.  If authentication fails, the user will be redirected back to the
 login page.  Otherwise, the primary route function will be called,
 which, in this example, will redirect the user to the home page.
 */

router.get('/github/callback',
    session.authenticate('github', {failureRedirect: '/user/login'}),
    function (req, res) {
        models.User.findOrCreate({
            where: {
                id: req.user.id
            },
            defaults: {
                displayName: req.user.displayName,
                username: req.user.username,
                profileUrl: req.user.profileUrl,
                emails: req.user.emails || []
            }
        }).spread(function (user) {
            req.flash('success', 'Successful login!');
            res.redirect('/user/account');
            importer.importForUser(req.user);
        });
        // @TODO pull projects for user from github API (with access type?)
    });


module.exports = router;
