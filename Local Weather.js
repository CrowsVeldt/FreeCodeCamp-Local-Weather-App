//TODO Change the API request to a Geolocation request 

$(document).ready(function(){

$.ajaxSetup({ cache: false });

  //variables to store the visitors latitude and longitude
let cels = 0;
let fahr = 0;

  //Get user's latitude and longitude from their IP address
navigator.geolocation.getCurrentPosition(position => {
  const lat = position.coords.latitude
  const lon = position.coords.longitude

 //API call to openweather
  const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=312986e3f1efaf26b7621838c022de56`;

  displayWeather(link);

  //when button is pressed, toggle temp between fahrenheit to celsius
  let current = 0;
  $("#temp-btn").click(function(){
     if (current === 0){
       $(".temp").html(`<h3 class='cels'> ${Math.round(cels)} °C</h3>`);
       current = 1;
     } else if (current === 1){
       $(".temp").html(`<h3 class='fahr'> ${Math.round(fahr)} °F</h3>`);
       current = 0; }

  });

});

function displayWeather (link){
   $.getJSON(link, function(data){

     //get the temprature in Kelvin and convert it to Fahrenheit and Celsius, remember to round them before displaying
     var temp = JSON.stringify(data["main"]["temp"]);
        cels = temp - 273.15;
        fahr = (temp * (9/5)) -459.67;
       $(".temp").html(`<h3 class='fahr'> ${Math.round(fahr)} °F</h3>`);


      //Weather is lowercase, let's change this up
     var weather = (data["weather"][0]["description"]);
        $(".weather").html(`<h3> ${weather} </h3>`);

     //name and country,  maybe expand the country code to the full name
     var city =(data["name"]);
     var country =(data["sys"]["country"]);

     $(".location").html(`<h3>${city}, ${country}</h3>`);

     //find and display an icon for the weather
     var icon = data["weather"][0]["icon"];

     var iconURL = `http://openweathermap.org/img/w/${icon}.png`;

     var html = `<img src='${iconURL}' alt='Weather Icon'>`;

     $(".weather-icon").html(html);



 });

}

});
