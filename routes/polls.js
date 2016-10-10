var express = require('express');
var router = express.Router();
var models = require('../models');
var session = require('../session');

router.get('/', session.ensureAuthenticated, function (req, res) {
    models.Poll.scope({method: ['allowedForUser', req.user]}).findAll().then(function (userPolls) {
        res.render('pages/listPolls', {user: req.user, polls: userPolls});
    });
});

router.get('/vote/:id', session.ensureAuthenticated, function (req, res) {
    models.Poll.findByPrimary(id);
    res.render('pages/vote', {user: req.user});
});

router.post('/vote/:id', session.ensureAuthenticated, function (req, res) {
    res.setHeader('Content-Type', 'routerlication/json');
    res.send(JSON.stringify({title: "congrats", html: "<p>you won!</p>"}));
});

module.exports = router;