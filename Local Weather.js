window.onload = weather

let cels = 0;
let fahr = 0;
let current = 0;
  
function weather () { 
  
  $.ajaxSetup({ cache: false });

  navigator.geolocation.getCurrentPosition(position => { 
    const lat = position.coords.latitude
    const lon = position.coords.longitude

    const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=312986e3f1efaf26b7621838c022de56`;

    $.getJSON(link, displayWeather);
  });
}

$("#temp-btn").click(function(){
  if (current === 0){
    $(".temp").html(`<h3 class='cels'> ${Math.round(cels)} °C</h3>`);
    current = 1;
  } else if (current === 1){
    $(".temp").html(`<h3 class='fahr'> ${Math.round(fahr)} °F</h3>`);
    current = 0; }
});

function displayWeather (data) {
  const temp = JSON.stringify(data["main"]["temp"]);
  cels = temp - 273.15;
  fahr = (temp * (9/5)) -459.67;
  $(".temp").html(`<h3 class='fahr'> ${Math.round(fahr)} °F</h3>`);

  const weather = (data["weather"][0]["description"]);
  $(".weather").html(`<h3> ${weather} </h3>`);

  const city = data["name"];
  const country = data["sys"]["country"];

  $(".location").html(`<h3>${city}, ${country}</h3>`);

  const iconURL = `http://openweathermap.org/img/w/${data["weather"][0]["icon"]}.png`;

  const html = `<img src='${iconURL}' alt='Weather Icon'>`;

  $(".weather-icon").html(html);
}
