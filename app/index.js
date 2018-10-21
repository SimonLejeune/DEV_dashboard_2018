const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function (req, res) {
    res.render('index.ejs'); // load the index.ejs file
});

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
router.get('/login', function (req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login.ejs', {message: req.flash('loginMessage')});
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
router.get('/signup', function (req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', {message: req.flash('signupMessage')});
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
}));

// =====================================
// TWITTER ROUTES ======================
// =====================================
// route for twitter authentication and login
router.get('/auth/twitter', passport.authenticate('twitter'));

// handle the callback after twitter has authenticated the user
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
}));

// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// the callback after google has authenticated the user
router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
}));

// =====================================
// OFFICE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
// router.get('/auth/azure_ad',
//     passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
//     function(req, res) {
//         log.info('Login was called in the Sample');
//         res.redirect('/');
//     });
//
// // POST /auth/openid/return
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request.  If authentication fails, the user will be redirected back to the
// //   home page.  Otherwise, the primary route function function will be called,
// //   which, in this example, will redirect the user to the home page.
// router.post('/auth/openid/return',
//     passport.authenticate('azuread-openidconnect', { successRedirect: '/dashboard', failureRedirect: '/' }),
//     function(req, res) {
//         console.log(res);
//         res.redirect('/');
//     });

router.get('/auth/openid/return',
    function(req, res, next) {
        passport.authenticate('azuread-openidconnect',
            {
                response: res,                      // required
                failureRedirect: '/'
            }
        )(req, res, next);
    },
    function(req, res) {
        log.info('We received a return from AzureAD.');
        res.redirect('/');
    });

// 'POST returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// body (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
router.post('/auth/openid/return',
    function(req, res, next) {
        passport.authenticate('azuread-openidconnect',
            {
                response: res,                      // required
                failureRedirect: '/'
            }
        )(req, res, next);
    },
    function(req, res) {
        log.info('We received a return from AzureAD.');
        res.redirect('/');
    });


module.exports = router;