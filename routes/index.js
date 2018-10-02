var express = require('express');
var router = express.Router();

let request = require('request');

let apiKey = '9cb9ebf1faf9432efdd2489ed4b4f914';
let city = 'Lille';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

request(url, function (err, response, body) {
    if(err){
        console.log('error:', error);
    } else {
        let weather = JSON.parse(body);
        let message = `It's ${weather.main.temp}  degrees in ${weather.name}!`;
        console.log(message);
    }
});

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
    res.render('index');
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;