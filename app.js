// modules
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')

const app = express();

// necessary code to pass through the body of the post request.
app.use(bodyParser.urlencoded({ extended: true}));

const { STATUS_CODES } = require('http');
// node module that allows the use and access of the get request from a https protocol for a website based api.



app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
    
})

app.post("/", function(req,res){
    // api information. Has to be in the app.post section when being created.
    const appKey = "key=9c6045f2530f4a24a81130713221505"
    const query = req.body.cityName
    const url = "https://api.weatherapi.com/v1/current.json?" + appKey + "&q=" + query

    // console.log(req.body.query)
    // console.log("Post Recieved")

    https.get(url, function(response) {
        console.log(response.statusCode);

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
            const icon = weatherData.current.condition.icon
            console.log(city, region, country, tempC, tempF, currentDay, windMPH, windKPH, conditionText)
            res.write("<p>The current weather in " + query + " is " + conditionText + ".<p>");
            // fun note... having an h2 prior to an h1 in this document will create a json packgage.
            res.write("<img src='" + icon + "'>")
            // when creating these inputs to pass information inside of your html files you need to write aspects of it the same way that you would if you writing a simple html document. The only difference is, is the quotations and the addition of your variables.
            res.write("<h1>The temperature is " + tempF + " degrees farenheit in " + query +".</h1>")
            res.send();
            // only one app res.send method can be used in any given document. choose wisely. You can res.write as many beforehand. res.send is the last action that can be done however. res.send can not be a written item when there is already a res.write occuring.
        })
    })
})

// https.get(url, function(response) {
//     console.log(response);

//     response.on("data", function(data){
//         const weatherData = JSON.parse(data)
//         // JSON.parse(data) allows the data to be converted to be findable as JS objects. With this the following inputs below are possible because we are able to pull the data from the API and insert them into our DOM or console.log.
//         const city = weatherData.location.name
//         const region = weatherData.location.region
//         const country = weatherData.location.country
//         const tempC = weatherData.current.temp_c
//         const tempF = weatherData.current.temp_f
//         const currentDay = weatherData.current.is_day
//         const windMPH = weatherData.current.wind_mph
//         const windKPH = weatherData.current.wind_kph
//         const conditionText = weatherData.current.condition.text
//         const icon = weatherData.current.condition.icon
//         console.log(city, region, country, tempC, tempF, currentDay, windMPH, windKPH, conditionText)
//         res.write("<p>The weather is currently " + conditionText + " in Aiken, SC.<p>");
//         // fun note... having an h2 prior to an h1 in this document will create a json packgage.
//         res.write("<img src='" + icon + "'>")
//         // when creating these inputs to pass information inside of your html files you need to write aspects of it the same way that you would if you writing a simple html document. The only difference is, is the quotations and the addition of your variables.
//         res.write("<h1>The temperature in Aiken is " + tempF + " degress farenheit.</h1>")
//         res.send();
//         // only one app res.send method can be used in any given document. choose wisely. You can res.write as many beforehand. res.send is the last action that can be done however. res.send can not be a written item when there is already a res.write occuring.
//     })
// })

// res.send("Server is up and running.")
// this was the original res.send request for this file. Has to be removed in order for app to work correct. Only one res.send request can be used in any given document.


app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})