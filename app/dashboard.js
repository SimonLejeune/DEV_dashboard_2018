const express = require('express');
const router = express.Router();
const request = require('request');


const apiKey = '9cb9ebf1faf9432efdd2489ed4b4f914';

router.get('/', isLoggedIn, function (req, res) {
    res.render('dashboard', {weather: null, error: null});
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

router.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('dashboard', {weather: null, error: 'Error, please try again'})
        } else {
            let weather = JSON.parse(body);
            console.log(weather);
            if (weather.main === undefined) {
                res.render('dashboard', {weather: null, error: 'Error, please try again'})
            } else {
                let weatherText = `Il fait ${weather.main.temp}° à ${weather.name}`;
                res.render('dashboard', {weather: weatherText, error: null})
            }
        }
    })
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;