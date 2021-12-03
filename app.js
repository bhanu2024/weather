const express = require('express');
const https = require('https');

const app = express();

app.get("/", function (req, res){
  const api_url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=08e90e579633f4defeec4b727f244418&units=metric";

  https.get(api_url, function (response){
    console.log(response.statusCode);

    response.on("data", function (data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const descri = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const icon_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently " + descri + ".</p>");
      res.write("<h1>The temperture in London is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + icon_url + " >")
      res.send();
    });
  });

});

app.listen(3000, function (){
  console.log("Server is running on port 3000.");
});
