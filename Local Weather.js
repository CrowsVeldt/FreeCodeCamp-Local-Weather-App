

$(document).ready(function(){

$.ajaxSetup({ cache: false });

  //variables to store the visitors latitude and longitude
var lat = "";
var lon = "";
var cels = 0;
var fahr = 0;

  //Get the visitors lat and lon and store them to the variables. This actually gets their IP's location, so it's not necessarily accurate
$.getJSON("http://ip-api.com/json", function(data) {
    lat = data["lat"];
    lon = data["lon"];

 // add the visitors lat and lon to an api call to openweather
  var link =   "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=312986e3f1efaf26b7621838c022de56";

  //call the getWather function to get the weather, to make sure that the api only gets called once the visitors lat and lon are known
  getWeather(link);

  //If the button is pressed, change the temp from fahrenheit to celsius or vice versa
  current = 0;
$("#temp-btn").click(function(){
   if (current === 0){
     $(".temp").html("<h3 class='cels'>" + Math.round(cels) + " " + "°C" + "</h3>");
     current = 1;
   } else if (current === 1){
     $(".temp").html("<h3 class='fahr'>" + Math.round(fahr) + " " + "°F" + "</h3>");
     current = 0; }

});

});

  //get the weather data, extract the bits we want, and add them to the DOM
function getWeather (link){
   $.getJSON(link, function(data){

     //get the temprature in Kelvin and convert it to Fahrenheit and Celsius, remember to round them before displaying
     var temp = JSON.stringify(data["main"]["temp"]);
        cels = temp - 273.15;
        fahr = (temp * (9/5)) -459.67;
       $(".temp").html("<h3 class='fahr'>" + Math.round(fahr) + " " + "°F" + "</h3>");


      //Weather is lowercase, let's change this up
     var weather = (data["weather"][0]["description"]);
        $(".weather").html("<h3>" + weather + "</h3>");

     //name and country,  maybe expand the country code to the full name
     var city =(data["name"]);
     var country =(data["sys"]["country"]);

     $(".location").html("<h3>" + city + ", " + country + "</h3>");

     //find and display an icon for the weather
     var icon = data["weather"][0]["icon"];

     var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";

     var html = "<img src = '" + iconURL + "' " + "alt='Weather Icon'>";

     $(".weather-icon").html(html);



 });

}

});
