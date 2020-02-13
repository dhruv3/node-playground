const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Dhruv"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Dhruv"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "Help Me!",
        title: "Help",
        name: "Dhruv"
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide a address"
        })
    }

    const inputQuery = req.query.address;

    geocode(inputQuery, (error, {lat, long, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(lat, long, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404error', {
        errorMsg: "Help article not found.",
        title: "404",
        name: "Dhruv"
    });
})

app.get('*', (req, res) => {
    res.render('404error', {
        errorMsg: "Page not found.",
        title: "404",
        name: "Dhruv"
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})