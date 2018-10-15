const express = require('express');
const router = express.Router();
const request = require('request');


const apiKey = '9cb9ebf1faf9432efdd2489ed4b4f914';


// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
    res.render('index', {weather: null, error: null});
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

router.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', {weather: null, error: 'Error, please try again'})
        } else {
            let weather = JSON.parse(body);
            if (weather.main === undefined) {
                res.render('index', {weather: null, error: 'Error, please try again'})
            } else {
                let weatherText = `Il fait ${weather.main.temp}° à ${weather.name}`;
                res.render('index', {weather: weatherText, error: null})
            }
        }
    })
});

module.exports = router;