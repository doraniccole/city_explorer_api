'use strict'
//pull in any environment variables (process.env) that live in a .env file
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const cors = require('cors');
//assign express to "app"
const app = express ();
app.use(cors());

const locations = {};

app.get('/location', locationHandler);
app.get('/restaurants', restaurantHandler);
app.get('/places', placesHandler);
app.use('*', notFoundHandler);


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
    response.json({ location: 'seattle', temp: '47 deg'});
});

app.get('weather', (request, response) => {
    //go get the weather from somewhere
    //build and aggregate/approval set of data to send to the user
    //send the weather data that approve back to the client
    //res.json({weatherDataFromAPIorDB})
});
function handleWeather(request, response) {
    // declare a variable named weather data that has its contents as the entire json file 
    let weatherData = require('./data/weather.json');
    // declaring a new array called days
    const days = [];
    // for each day in weatherData, we will create a new Object
    weatherData.data.forEach(day => days.push(new Day(day)));
    response.send(days);
}

function Day(dayData) {
    this.forecast = dayData.weather.description;
    this.time = dayData.datetime;
}
//weather function Mark and Kim

//http://locationhost:3000/location?city=slc&county=sl
app.get('/location', handleLocation);

function Location (city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData [0].lat;
    this.longitude = geoData [0].lon;
}

function handleLocation(request, response) {
try{
// try to resolve the following with no errors
const geoData = require('./data/location.json');
const city = request.query.city;
console.log
const locationData = new Location(city, geoData);
response.json(locationData);
} catch {
    //otherwise, if an error occurs
    // handle error here
    response.status(500).send('sorry, something broke.');
}}

app. get('*', (request, response) => {
    response.status(404).send('not found');
});

// configure our app to accept and listen for incoming traffic
app.listen(PORT, () => {
    console.log(`server up: ${PORT}`);

});

const superagent = require('superagent');

// callback
superagent
    .post('https://www.weatherbit.io/account/dashboard')
    .send({ weather: '', storms: '' }) // sends a JSON post body
    .set('https://www.weatherbit.io/account/dashboard', '79b23f2d2f38464fb88f1a20231b5c78')
    .set('accept', 'json')
    .end((err, res) => {
        // Calling the end function will send the request
    });

// promise with then/catch
superagent.post('').then(console.log).catch(console.error);

// promise with async/await
(async () => {
    try {
        const res = await superagent.post('');
        console.log(res);
    } catch (err) {
        console.error(err);
    }
})();