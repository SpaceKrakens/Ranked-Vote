var express = require('express');
var util = require('util');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var partials = require('express-partials');
var helmet = require('helmet');
var routes = require('./routes');
var passSession = require('./session');

var models = require('./models');

var app = express();
app.use(helmet());
models.sequelize.sync();
// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(partials());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: false}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passSession.initialize());
app.use(passSession.session());

app.use('/', require('./routes/index'));
app.use('/user', require('./routes/users'));
app.use('/poll', require('./routes/polls'));
app.use('/auth', require('./routes/auth'));




app.listen(3000);



