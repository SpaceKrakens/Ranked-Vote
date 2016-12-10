var express = require('express');
var router = express.Router();
var models = require('../models');
var session = require('../session');

// @TODO Massive cleanup...

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
        include: [models.Option, {model: models.User, where: {id: req.user.id}, required: false}]
    }).then(function (poll) {
        var vote = null;
        poll.Options = models.transformToObject(poll.Options);
        if (poll.Users.length > 0) {
            vote = poll.Users[0].Vote;
        }
        res.render('pages/vote', {user: req.user, poll: poll, vote: vote});
    });

})
;

// post actual vote for poll
router.post('/vote/:id', session.ensureAuthenticated, function (req, res) {
    models.Poll.findByPrimary(req.params.id).then(function (poll) {
        req.user.addPoll(poll, {data: req.body.sort}).then(function () {
            res.setHeader('Content-Type', 'routerlication/json');
            res.send(JSON.stringify({title: 'congrats', html: '<p>you won!</p>'}));
        });
    });
    // @TODO actual saving of vote data depending on poll type
});

/* poll results
 * @TODO fill with live
 * @TODO determine if authentification should be required
 * @TODO determine if 'live'/intermediate results should be shown or not
 * (maybe only if no deadline is configured)
 */
router.get('/result/:id', function (req, res) {
    // do stuff
});

// create new poll
router.get('/create', function (req, res) {
    req.user.getProjects().then(function (projects) {
        res.render('pages/create', {user: req.user, projects: projects});
    });
});

// receive new poll
router.post('/create', function (req, res) {
    /* @TODO: fill with magic */
});

module.exports = router;
