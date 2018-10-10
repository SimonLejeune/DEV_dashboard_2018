const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = '9cb9ebf1faf9432efdd2489ed4b4f914';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null})
});

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', {weather: null, error: 'Error, please try again'})
        } else {
            let weather = JSON.parse(body);
            console.log(weather);
            if (weather.main === undefined) {
                res.render('index', {weather: null, error: 'Error, please try again'})
            } else {
                let weatherText = `Il fait ${weather.main.temp}° à ${weather.name} bite`;
                res.render('index', {weather: weatherText, error: null})
            }
        }
    })
});

app.listen(8080, function () {
    console.log('Example app listening on port 3000!')
});