var express = require('express');
var router = express.Router();
var session = require('../session');
/* GET home page. */
router.get('/', function (req, res) {
    res.render('pages/index', {user: req.user});
});

router.get('/account', ensureAuthenticated, function (req, res) {
    res.render('pages/account', {user: req.user});
});

router.get('/login', function (req, res) {
    res.render('pages/login', {user: req.user});
});

router.get('/vote', function (req, res) {
    res.render('pages/vote', {user: req.user});
});

router.post('/vote/submit', function (req, res) {
    res.setHeader('Content-Type', 'routerlication/json');
    res.send(JSON.stringify({title: "congrats", html: "<p>you won!</p>"}));
});

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this routerlication at /auth/github/callback
router.get('/auth/github',
    session.authenticate('github', {scope: ['user:email']}),
    function (req, res) {
        // The request will be redirected to GitHub for authentication, so this
        // function will not be called.
    });

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/github/callback',
    session.authenticate('github', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect('/account');
    });

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
module.exports = router;


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // have a way to return to the last page the user was on when not authenticated after login is done
    res.redirect('/login');
}
