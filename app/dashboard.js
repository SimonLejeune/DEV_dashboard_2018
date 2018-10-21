const express = require('express');
const router = express.Router();
const request = require('request');
const $ = require('jquery')


const apiKey = '9cb9ebf1faf9432efdd2489ed4b4f914';
const apiKey_Steam = 'B80BA570C678C23C56E3B4F42CC90FBF';
const id_default = '76561198068118015';
var CurrentWeather = null;
var PrevisionWeather = null;
var steamInfo = null;
var steamGameList = null;

router.get('/', isLoggedIn, function (req, res) {
<<<<<<< HEAD
    res.render('dashboard', {weather: null, weatherWeek: null, steamInfo: null, GameList: null, error: null});
=======
    res.render('dashboard', {weather: null, weatherWeek: null, error: null, user : req.user});
>>>>>>> e74407d6e1032d5b7ba9850c32e6cc75f160331e
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function getRequest(url, res) {
    return new Promise(function (success, failure) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Success");
                success(body);
            } else {
                console.log("Error");
                res.render('dashboard', {weather: CurrentWeather, weatherWeek: PrevisionWeather, steamInfo: steamInfo, GameList: steamGameList, error: 'Error, please try againnn'})
                // failure(error);
            }
        });
    });
}

router.post('/InfoSteam',  function (req, res) {
    id = req.body.id;
    console.log(id);
    let url_steam_info = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey_Steam}&steamids=${id}`;
    let url_get_game =  ` http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey_Steam}&steamid=${id}&format=json`;
    let steamText = [];
    getRequest(url_steam_info, res).then(function (body1) {
        let steam_info = JSON.parse(body1);
        if (steam_info.response.players.length == 0)
            res.render('dashboard', {weather: CurrentWeather, weatherWeek: PrevisionWeather, steamInfo: steam_info, GameList: steamGameList, error: 'Error, please try againnn'})
        else
          //  steamText = steam_info.response.players[0].avatarfull;
            steamText.push(steam_info.response.players[0].avatarfull);
            steamText.push(steam_info.response.players[0].personaname);
            if (steam_info.response.players[0].personastate == 0)
                steamText.push("disconnected");
            else
                steamText.push("connected");
            steamText.push(steam_info.response.players[0].profileurl)
            steamInfo = steamText;
            return getRequest(url_get_game, res);

    }).then(function (body2) {
        let steam_games = JSON.parse(body2);
        let games_list = [];
    //    while (steam_games.response)
        var i = 0;
        while (i != steam_games.response.games.length) {
            games_list.push(steam_games.response.games[i].name);
            i++;
        }
        steamGameList = games_list;
        res.render('dashboard', {weather: CurrentWeather, weatherWeek: PrevisionWeather, steamInfo: steamInfo, GameList: steamGameList, error: null});
        })
});

router.post('/currentMeteo', function (req, res) {
        let city = req.body.city;
        if (city === undefined)
            city = "lille";
        let url_current_weather = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        let url_weather_five_days = `http://api.openweathermap.org/data/2.5/forecast?q=${city},fr&units=metric&appid=${apiKey}`
        let weatherText = [];
        let weatherWeekText = [];
        getRequest(url_current_weather, res).then(function (body1) {
            let weather_current = JSON.parse(body1);
            if (weather_current.main === undefined) {
<<<<<<< HEAD
                res.render('dashboard', {weather: null, weatherWeek: null, steamInfo: null, GameList: null, error: 'Error, please try again'})
=======
                res.render('dashboard', {weather: null, weatherWeek: null, error: 'Error, please try again', user : req.user})
>>>>>>> e74407d6e1032d5b7ba9850c32e6cc75f160331e
            } else {
                cityGlob = city;
                weatherText = []
                weatherText.push( `Temp: ${weather_current.main.temp}°`);
                weatherText.push( `Sky : ${weather_current.weather[0].description}`);
                weatherText.push( `Temp max: ${weather_current.main.temp_max}°`);
                weatherText.push( `Temp min: ${weather_current.main.temp_min}°`);
                weatherText.push( `Humidity: ${weather_current.main.humidity}%`);
                return getRequest(url_weather_five_days, res);
            }}).then(function (body2) {
            let weather_prevision = JSON.parse(body2);
            let my_list = [];
            my_list.push(weather_prevision.list);
            let second_list = my_list.pop();
            let size_json = second_list.length;
            let i = 0;
            let today = Date.now();
            let T = new Date(today);
            let tmp = null;
            while (size_json != i) {
                tmp = new Date(weather_prevision.list[i].dt_txt)
                let dayCurrent = [];
                if ((T.getDay() - tmp.getDay()) != 0 && tmp.getHours() == 12) {
                    dayCurrent = [];
                    dt = new Date(weather_prevision.list[i].dt_txt);
                    dayCurrent.push(dt.getDate() + "/" + dt.getMonth() +
                        ": Temp = " + weather_prevision.list[i].main.temp +
                        "; Sky = " + weather_prevision.list[i].weather[0].description +
                        "; Humidity = " + weather_prevision.list[i].main.humidity);
                }
                weatherWeekText.push(dayCurrent);
                i++;
            }
<<<<<<< HEAD
            CurrentWeather = weatherText;
            PrevisionWeather = weatherWeekText;
            res.render('dashboard', {weather: weatherText, weatherWeek: weatherWeekText, steamInfo:steamInfo, GameList: steamGameList,  error: null});
=======
            return getRequest(url_steam_info, res);
        }).then(function (body3) {
            let steam_info = JSON.parse(body3);
            res.render('dashboard', {weather: weatherText, weatherWeek: weatherWeekText, error: null, user : req.user});
>>>>>>> e74407d6e1032d5b7ba9850c32e6cc75f160331e
        })
    }
);

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;