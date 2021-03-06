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
    response.json({ location: 'seattle', temp: '47 deg'});
});
function Location (city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData.display_name;
    this.latitude = geoData.lat;
    this.longitude = geoData.lon;
}

function handleLocation(request, response) {
    try {
// try to resolve the following with no errors
    //const geoData = require('./data/location.json'); error here
    const city = request.query.city;
    let key = process.env.GEOCODE_API_KEY
        let url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`
        superagent.get(url)
        .then (data => {
            const locationResults = data.body[0]
            console.log(locationResults)
            const location = new Location(city, locationResults)
            console.log (location)
            response.status(200).send(location)
        })
//     console.log
//     const locationData = new Location(city, geoData); //geoData in location.json
// response.json(locationData); //js object sent to client--  error here
} catch {
    //otherwise, if an error occurs
    // handle error here
    response.status(500).send('sorry, something broke.');
}}

app. get('*', (request, response) => {
    response.status(404).send('not found');
});

// configure app to accept and listen for incoming traffic
app.listen(PORT, () => {
    console.log(`server up: ${PORT}`);

});

//http://locationhost:3000/location?city=slc&county=sl
//app.get('/location', handleLocation);
//location functions from lecture

app.get('weather', (request, response) => {
//     //go get the weather
//     //build and aggregate/approval set of data to send to the user
//     //send the weather data that approve back to the client
//     //res.json({weatherDataFromAPIorDB})
 });

function Day(dayData) {
    this.forecast = dayData.weather.description;
    this.time = dayData.dateTime;
}
 //weather function Mark and Kim
function handleWeather(request, response) {
//     // declare a variable named weather data held in local json file 
     let weatherData = require('../data/weather.json');
     console.log('here comes the sun ' + weatherData)
//     // declaring a new array called days
     const days = [];
//     // for each day in weatherData, we will create a new Object
     weatherData.data.forEach(day => days.push(new Day(day)));
     response.send(days);
 }


// // callback
  superagent
      .post('https://api.weatherbit.io/v2.0/current')
      .send({ weather: '', storms: '' }) // sends a JSON post body
      .set('key', '3ca74d71fc084f829406f2c20e9b0333')
      .set('accept', 'json')
      .end((err, res) => {
//          // Calling the end function will send the request
     });

 // promise with then/catch
 superagent.post('').then(console.log).catch(console.error);

 // promise with async/await
 (async () => {
     try {
         const res = await superagent.post(''); // await: waits until promise resolves
         console.log(res);   // print res to the console
     } catch (err) {
         console.error(err); // print errors if any occur
     }
 })(); 