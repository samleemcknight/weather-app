const express = require("express")
const ejsLayouts = require("express-ejs-layouts")

const app = express()

app.set('view engine', 'ejs')
app.use(ejsLayouts)
const weatherJs = require("weather-js")

app.get('/', function(req, res) {
    res.render('index')
})

// get request for form
app.get('/weather', function(req, res) {
    //get zipcode from form
    let zipCode = req.query.zip
    //put zipcode into url
    res.redirect('weather/' + zipCode)
})

app.get('/weather/:zip', function(req, res) {
    let zipCode = req.params.zip;
    res.render('weather', {
        zip: zipCode,
        weather: weatherJs
    })
    
})

app.listen(3000)