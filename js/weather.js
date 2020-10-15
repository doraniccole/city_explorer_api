'use strict'
//pull in any environment variables (process.env) that live in a .env file
require('dotenv').config();
const express = require('express'); //to use express package in app
const superagent = require('superagent'); //to use superagent in app in association with Node
const cors = require('cors');
//assign express to "app"
const app = express(); //creates express server and naming it app
app.use(cors()); //creating new cors service-- app will use cors service 

const locations = {};

app.get('/location', handleLocation); //express (app) retrieves url, location function
// app.get('/restaurants', restaurantHandler);
// app.get('/places', placesHandler);
//app.use('*', notFoundHandler);

const PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
    response.send('my homepage');
});

app.get('/unauthorized', (request, response) => {
    throw new Error('not authorized to access this route');
});

// simple API route to power data
app.get('/test/route', (request, response) => {
    //see an API as data that can be used to power other applications 
    response.json({ location: 'seattle', temp: '47 deg' });
}); 

app.get('weather', (request, response) => {
    //     //go get the weather
    //     //build and aggregate/approval set of data to send to the user
    //     //send the weather data that approve back to the client
    //     //res.json({weatherDataFromAPIorDB})
});

app.get()

function Day(dayData) {
    this.forecast = dayData.weather.description;
    this.time = dayData.dateTime;
}
//weather function Mark and Kim
function handleWeather(request, response) {
    //     // declare a variable named weather data held in local json file 
    let weatherData = require('../data/weather.json');
    //     // declaring a new array called days
    const days = [];
    //     // for each day in weatherData, we will create a new Object
    weatherData.data.forEach(day => days.push(new Day(day)));
    response.send(days);
}