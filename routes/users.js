var express = require('express');
var router = express.Router();
var session = require('../session');

router.get('/account', session.ensureAuthenticated, function (req, res) {
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



