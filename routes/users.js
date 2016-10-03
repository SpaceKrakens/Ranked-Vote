var express = require('express');
var router = express.Router();

router.get('/account', ensureAuthenticated, function (req, res) {
    res.render('pages/account', {user: req.user});
});

router.get('/login', function (req, res) {
    res.render('pages/login', {user: req.user});
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
    res.redirect('/user/login');
}
