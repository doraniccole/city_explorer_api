'use strict'
//pull in any envirionment variables (process.env) that live in a .env file
require('dotenv').config();
//the above "dotenv" require is the same as 
//const dotenv = require('dotenv')
//dotenv.config();
// ? const { response, request } = require('express');
const express = require('express');
//pull in express and assign the whole app to express
const cors = require('cors');
//assign express to "app"
const app = express ();
app.use(cors());

//assign a port or location for accepting incoming traffic
// developers often default their dev port to 3000 or 3001 for backgrounds
// and often 8000 8080 for front ends
const PORT = process.env.PORT || 3000;


app.get('/', (request, response) => {
    response.send('my homepage');

});
//show how we produce app errors:
app.get('/unauthorized', (request, response) => {
    throw new Error('not authorized to access this route');
});

// simple API route to power data
app.get('/test/route', (request, response) => {
    //see an API as data that can be used to power other applications 
    response.json({ location: 'seattle', temp: '47 deg'});
});

app.get('wester', (request, response) => {
    //go get the weather from somewhere
    //build and aggregate/approval ser of data to send to the user
    //send the weather data that apporve back to the client
    //res.json({westherDataFromAPIorDB})
});
//http://locationhost:3000/location?city=slc&county=sl
app.get('/location', handleLocation);

function Location (city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData [0];
    this.longitude = geoData [0];
}

functions handleLocation(request, response) {
try{
// try to resolve the following with no errors
const geoData = require('./data/location.json');
const city = request.query.city;
const locationData = new Location(city, geoData);
response.json(locationData);
} catch {
    //otherwise, if an error occurs
    // handle error here
    response.status(500).send('sorry, something broke.');
}
}

app. get('*', (request, response) => {
    response.status(404).send('not found');
});

// configure our app t oaccept and listen for incoming traffic
app.listen(PORT, () => {
    console.log(`server up: ${PORT}`);

});


