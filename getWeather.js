const express= require("express");
const https= require("https");
const app= express();
const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
   res.sendFile(__dirname+"/CityName.html");
})
app.post("/", function(req, res){
    const query= req.body.cityName;
    const appKEY="5a4cb355b8c1c6ac97c625eccb4076ca";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=metric&APPID="+ appKEY;
    
        https.get(url, function(response){
            response.on("data", function(data){
            const realdata= JSON.parse(data);
            const icon= realdata.weather[0].icon;
            const imgURL= "https://openweathermap.org/img/wn/"+ icon+ "@2x.png";
            res.send("<h1>The temperature in " + query +" is " +realdata.main.temp +".</h1><h1>The weather description is currently "+ realdata.weather[0].description +".</h1><img src="+imgURL+">");
            })
        });
    })

app.listen(3000, function(){
    console.log("The server is running on port 3000")
})