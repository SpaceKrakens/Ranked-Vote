var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function (req, res) {
    var userPolls = [];
    models.User.findById(req.user.id).then(function (user) {
        user.getProjects().then(function (projects) {

            projects.each(function (project) {
                project.getPolls().then(function (polls) {
                    userPolls.add(polls);
                })
            }).then(
                models.Polls.findAll(
                    {
                        where: {
                            access: models.Polls.type.all
                        }
                    }
                ).then(
                    function (polls) {
                        userPolls.add(polls);
                    }
                )
            )
        })
    }).then(
        res.render('pages/listPolls', {polls: userPolls})
    );
});

router.get('/vote', function (req, res) {
    res.render('pages/vote', {user: req.user});
});

router.post('/vote', function (req, res) {
    res.setHeader('Content-Type', 'routerlication/json');
    res.send(JSON.stringify({title: "congrats", html: "<p>you won!</p>"}));
});

module.exports = router;