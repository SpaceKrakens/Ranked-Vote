var express = require('express');
var router = express.Router();
var models = require('../models');
var session = require('../session');

// list available polls for the user
router.get('/', session.ensureAuthenticated, function (req, res) {
    models.Poll.scope({method: ['allowedForUser', req.user]}).findAll().then(function (userPolls) {
        res.render('pages/listPolls', {user: req.user, polls: userPolls});
    });
});

// view poll details / vote form
router.get('/vote/:id', session.ensureAuthenticated, function (req, res) {
    models.Poll.findOne({
        where: {id: req.params.id},
        include: [{model: models.Option}]
    }).then(function (poll) {
        res.render('pages/vote', {user: req.user, poll: poll});
    });

});

// post actual vote for poll
router.post('/vote/:id', session.ensureAuthenticated, function (req, res) {
    // @TODO actual saving of vote data depending on poll type
    res.setHeader('Content-Type', 'routerlication/json');
    res.send(JSON.stringify({title: "congrats", html: "<p>you won!</p>"}));
});

/* poll results
 * @TODO fill with live
 * @TODO determine if authentification should be required
 * @TODO determine if 'live'/intermediate results should be shown or not (maybe only if no deadline is configured)
 */
router.get('/result/:id', function (req, res) {
    // do stuff
});

module.exports = router;