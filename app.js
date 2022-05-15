const express = require('express');
const { STATUS_CODES } = require('http');
const https = require('https');
const app = express();
const url = "https://api.weatherapi.com/v1/current.json?key=9c6045f2530f4a24a81130713221505&q=Aiken"


app.get("/", function(req, res){


    https.get(url, function(response) {
        console.log(response);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            // JSON.parse(data) allows the data to be converted to be findable as JS objects. With this the following inputs below are possible because we are able to pull the data from the API and insert them into our DOM or console.log.
            const city = weatherData.location.name
            const region = weatherData.location.region
            const country = weatherData.location.country
            const tempC = weatherData.current.temp_c
            const tempF = weatherData.current.temp_f
            const currentDay = weatherData.current.is_day
            const windMPH = weatherData.current.wind_mph
            const windKPH = weatherData.current.wind_kph
            const conditionText = weatherData.current.condition.text
            console.log(city, region, country, tempC, tempF, currentDay, windMPH, windKPH, conditionText)
        })
    })

    res.send("Server is up and running.")
})

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})