const express = require("express")
const ejsLayouts = require("express-ejs-layouts")
const fs = require("fs")
const weatherJs = require("weather-js")

const app = express()

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.static(__dirname + '/assets')) // trying to add stylesheets
app.get('/', function(req, res) {
    res.render('index', {})
})

let weatherData = []
// get request for form
app.get('/zipcode', function(req, res) {
    console.log(req.query.zip)
    weatherJs.find({ search: req.query.zip, degreeType: 'F' }, function (err, result) {
        if (err) console.log(err);
        weatherData = result;
        res.redirect('weather/')
    });
})

app.get('/weather', function(req, res) {
    if (typeof weatherData === "undefined") {
        res.redirect('/')
    } else {
        res.render("weather", 
        { city: weatherData[0].location.name,
          date: weatherData[0].current.date,
          currentTemp: weatherData[0].current.temperature,
            sky: weatherData[0].forecast[1].skytextday
        })
    }
})

app.listen(3000)