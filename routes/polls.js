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
        models.Vote.findOne({
            where: {
                pollId: poll.id, userId: req.user.id
            }
        }).then(function (vote) {
            res.render('pages/vote', {user: req.user, poll: poll, vote: vote});
        });
    });

})
;

// post actual vote for poll
router.post('/vote/:id', session.ensureAuthenticated, function (req, res) {
    models.Vote.upsert({
        pollId: req.params.id,
        userId: req.user.id,
        data: JSON.stringify(req.body.sort)
    }).then(function (created) {
        res.setHeader('Content-Type', 'routerlication/json');
        res.send(JSON.stringify({title: "congrats", html: "<p>you won!</p>"}));
    });
    // findOrCreate({
    //     where: {
    //         userId: req.user.id,
    //         pollId: req.params.id
    //     }
    // }).then(function (vote) {
    //     vote[0].updateAttributes({data: req.body.sort}).then(function () {
    //
    //         res.setHeader('Content-Type', 'routerlication/json');
    //         res.send(JSON.stringify({title: "congrats", html: "<p>you won!</p>"}));
    //     });
    // })// @TODO actual saving of vote data depending on poll type
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