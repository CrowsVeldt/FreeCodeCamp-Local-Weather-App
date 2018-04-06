window.onload = weather

let temp = 0;
let tempToggle = 0;
  
function weather () { 
  $.ajaxSetup({ cache: false });

  navigator.geolocation.getCurrentPosition(position => { 
    const lat = position.coords.latitude
    const lon = position.coords.longitude

    const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=312986e3f1efaf26b7621838c022de56`;

    $.getJSON(link, displayWeather);
  });
}

function displayWeather (data) {
  temp = JSON.stringify(data["main"]["temp"]);
  const weather = (data["weather"][0]["description"]);
  const city = data["name"];
  const country = data["sys"]["country"];
  const weatherIcon = `<img src='http://openweathermap.org/img/w/${data["weather"][0]["icon"]}.png' alt='Weather Icon'>`;

  $(".temp").html(`<h3 class='fahr'> ${Math.round(convertTemperature('fahr', temp))} °F</h3>`);
  $(".weather").html(`<h3> ${weather} </h3>`);
  $(".location").html(`<h3>${city}, ${country}</h3>`);
  $(".weather-icon").html(weatherIcon);
}

function convertTemperature (scale, temp) {
  return scale === 'cels' ? 
    temp - 273.15 :
    scale === 'fahr' ?
    (temp * (9/5)) -459.67 :
    null
}

$("#temp-btn").click(function(){
  if (tempToggle === 0){
    $(".temp").html(`<h3 class='cels'> ${Math.round(convertTemperature('cels', temp))} °C</h3>`);
    tempToggle = 1;
  } else if (tempToggle === 1){
    $(".temp").html(`<h3 class='fahr'> ${Math.round(convertTemperature('fahr', temp))} °F</h3>`);
    tempToggle = 0; }
});
