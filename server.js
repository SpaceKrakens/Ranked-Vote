var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    partials = require('express-partials'),
    helmet = require('helmet'),
    passport = require('./session'),
    flash = require('connect-flash'),
    messages = require('express-messages');

var app = express();

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(helmet());
app.use(express.static(__dirname + '/public'));
app.use(partials());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messager = messages(req, res);
    next();
});
// Configure routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/users'));
app.use('/poll', require('./routes/polls'));
app.use('/auth', require('./routes/auth'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

module.exports = app;
