
$(document).ready(function(){

$.ajaxSetup({ cache: false });

  //variables to store the visitors latitude and longitude
var lat = "";
var lon = "";
var cels = 0;
var fahr = 0;

  //Get the visitors lat and lon and store them to the variables
$.getJSON("http://ip-api.com/json", function(data) {
    lat = Math.floor(data["lat"]);
    lon = Math.floor(data["lon"]);

 // add the visitors lat and lon to an api call to openweather
  var link =   "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=312986e3f1efaf26b7621838c022de56";

  //call the getWather function to get the weather, to make sure that the api only gets called once the visitors lat and lon are known
  getWeather(link);

});

  //get the weather data, extract the bits we want, and add them to the DOM (in progress)
function getWeather (link){
   $.getJSON(link, function(data){

     //get the temprature in Kelvin and convert it to Fahrenheit and Celsius, remember to round them before displaying
     var temp = JSON.stringify(data["main"]["temp"]);
        cels = temp - 273.15;
        fahr = (temp * (9/5)) -459.67;
     $(".temp").html("<h3>" + Math.round(fahr) + " " + "°F" + "</h3>");

      //Weather is lowercase and in quotes, let's change this up
     var weather = JSON.stringify(data["weather"][0]["description"]);
        $(".weather").html("<h3>" + weather + "</h3>");

     //name and country, remove the quotes, add a comma, and maybe expand the country code to the full name
     var city = JSON.stringify(data["name"]);
     var country = JSON.stringify(data["sys"]["country"]);

     $(".location").html("<h3>" + city + ", " + country + "</h3>");

     //find and display an icon for the weather, try font awesome
     var icon = data["weather"][0]["icon"]



 });

}

});
