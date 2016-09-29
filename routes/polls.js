var express = require('express');
var router = express.Router();

router.get('/vote', function (req, res) {
    res.render('pages/vote', {user: req.user});
});

router.post('/vote', function (req, res) {
    res.setHeader('Content-Type', 'routerlication/json');
    res.send(JSON.stringify({title: "congrats", html: "<p>you won!</p>"}));
});

module.exports = router;