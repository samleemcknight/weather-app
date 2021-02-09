const express = require("express")
const app = express()
app.set('view engine', 'ejs')

const weatherJs = require("weather-js")

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/weather/:zip', function(req, res) {
    let zipCode = req.params.zip;
    res.render('weather.ejs', {
        zip: zipCode,
        weather: weatherJs
    })
    
})

app.listen(3000)