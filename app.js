var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

var FacebookStrategy = require('passport-facebook').Strategy;

var AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2');

var fs = require('fs');
var https = require('https');

mongoose.connect("mongodb://localhost/dashboard", { useNewUrlParser: true });


var routes = require('./routes/index');
var users = require('./routes/users');

// Init app

var app = express();



// View Engine

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

// Static Folder

app.use(express.static(path.join(__dirname, 'public')));

// Express Session

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passeport init

app.use(passport.initialize());
app.use(passport.session());

// Express Validator

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Connect Flash

app.use(flash());

app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/', routes);
app.use('/users', users);

// Set Port
app.set('port', (process.env.PORT || 8443));

var certOptions = {
    key: fs.readFileSync(path.resolve('server.key')),
    cert: fs.readFileSync(path.resolve('server.crt'))
}

// var httpServer = http.createServer(app);
var httpsServer = https.createServer(certOptions, app);

httpsServer.listen(8443, function () {
    console.log('Server started on port '+app.get('port'));

});

passport.use(new FacebookStrategy({
        clientID: '329487647627097',
        clientSecret: '597b8abd87ee0c8232518d07e37e0d84',
        callbackURL: "https://localhost:8443/"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            if (err) { return done(err); }
            done(null, user);
        });
    }
));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: 'index', failureRedirect: '/users/login' }),
    function (req, res) {
        res.redirect('index');
    });

passport.use(new AzureAdOAuth2Strategy({
        clientID: '9638e45d-956a-4034-af8e-9368d07871f8',
        clientSecret: 'luihKQBW8534*;$ibmMAW3:',
        callbackURL: 'https://www.example.net/auth/azureadoauth2/callback',
        resource: '00000002-0000-0000-c000-000000000000',
        tenant: 'contoso.onmicrosoft.com'
    },
    function (accessToken, refresh_token, params, profile, done) {
        // currently we can't find a way to exchange access token by user info (see userProfile implementation), so
        // you will need a jwt-package like https://github.com/auth0/node-jsonwebtoken to decode id_token and get waad profile
        var waadProfile = profile || jwt.decode(params.id_token);

        // this is just an example: here you would provide a model *User* with the function *findOrCreate*
        User.findOrCreate({ id: waadProfile.upn }, function (err, user) {
            done(err, user);
        });
    }));

app.get('/auth/azureadoauth2',
    passport.authenticate('azure_ad_oauth2'));

app.get('/auth/azureadoauth2/callback',
    passport.authenticate('azure_ad_oauth2', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });