import './style.css';
import { format, addDays, compareAsc } from 'date-fns';

console.log('hello');
console.log('bye');
let placeName = 'London';

//moon phases
// function load_moon_phases(obj, callback) {
//   var gets = [];
//   for (var i in obj) {
//     gets.push(i + '=' + encodeURIComponent(obj[i]));
//   }
//   gets.push('LDZ=' + new Date(obj.year, obj.month - 1, 1) / 1000);
//   var xmlhttp = new XMLHttpRequest();
//   var url = 'https://www.icalendar37.net/lunar/api/?' + gets.join('&');
//   xmlhttp.onreadystatechange = function () {
//     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//       callback(JSON.parse(xmlhttp.responseText));
//     }
//   };
//   xmlhttp.open('GET', url, true);
//   xmlhttp.send();
// }
// let getMoon = () => {
//   let days = []
//   var d = new Date().getDate(); //find day
//   var m = document.querySelectorAll('#contain_moon div');
//   var a = new XMLHttpRequest();
//   var url =
//     'https://www.icalendar37.net/lunar/api/?lang=en&month=' +
//     (new Date().getMonth() + 1) +
//     '&year=' +
//     new Date().getFullYear() +
//     '&size=60&shadeColor=rgba(255,255,255,0)&lightColor=rgba(255, 72, 176, .1)&LDZ=' +
//     new Date(new Date().getFullYear(), new Date().getMonth(), 1) / 1000 +
//     '';
//   // m[1].style.height = '30px';
//   a.onreadystatechange = function () {
//     if (a.readyState == 4 && a.status == 200) {
//       var b = JSON.parse(a.responseText);
//       m[1].innerHTML = b.phase[d].svg;
//       if (typeof moon_widget_loaded == 'function') moon_widget_loaded(b);
//     }
//   };
//   a.open('GET', url, true);
//   a.send();
// };
let today = new Date();
let tomorrow = addDays(today, 1);
console.log(today, tomorrow);
console.log(today.getDate());
(function () {
  var d = new Date().getDate();
  var m = document.querySelectorAll('#contain_moon div');
  var a = new XMLHttpRequest();
  var url =
    'https://www.icalendar37.net/lunar/api/?lang=en&month=' +
    (new Date().getMonth() + 1) +
    '&year=' +
    new Date().getFullYear() +
    '&size=65&shadeColor=rgba(255,255,255,0)&lightColor=rgba(255, 72, 176, .1)&LDZ=' +
    new Date(new Date().getFullYear(), new Date().getMonth(), 1) / 1000 +
    '';
  m[1].style.height = '30px';
  a.onreadystatechange = function () {
    if (a.readyState == 4 && a.status == 200) {
      var b = JSON.parse(a.responseText);
      console.log(b);
      m[1].innerHTML = b.phase[d].svg;
      if (typeof moon_widget_loaded == 'function') moon_widget_loaded(b);
    }
  };
  a.open('GET', url, true);
  a.send();
})();

let getLatLon = async placeName => {};
let lat = 40.7128;
let lon = -74.006;
let getWeatherData = async (lat, lon) => {
  try {
    //One Call API 1.0 - Current weather plus daily forecast
    let exclude = 'minutely,hourly,alerts';
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=${exclude}&appid=d690f17492f89e48239c79b3c0f9b19b
      `,
      { mode: 'cors' }
    );
    let responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.log(error);
  }
};
let todayDiv = document.getElementById('today');
let tomorrowDiv = document.getElementById('tomorrow');
let sunriseTime = document.querySelector('.sunriseTime');
let sunsetTime = document.querySelector('.sunsetTime');

let temperatureConversion = (temp, unit) => {};

let processWeatherData = weatherData => {
  console.log(weatherData);
  let todayData = weatherData['current'];

  //today
  let todaysDate = format(new Date(todayData['dt'] * 1000), 'EEEE, MMMM d');
  let todaysDateDiv = todayDiv.querySelector('.date');
  todaysDateDiv.textContent = todaysDate;
  let sunrise = format(new Date(todayData['sunrise'] * 1000), 'HH:mm');
  let sunset = format(new Date(todayData['sunset'] * 1000), 'HH:mm');
  sunriseTime.textContent = sunrise;
  sunsetTime.textContent = sunset;
  let temp0 = Math.round(todayData['temp'], 0);
  let description0 = todayData['weather'][0]['description'];
  todayDiv.querySelector('.temperature').textContent = temp0 + '°';
  todayDiv.querySelector('.description').textContent = description0;

  //tomorrow
  let nextData = weatherData['daily'];
  let tomorrowsDate = format(
    new Date(nextData[1]['dt'] * 1000),
    'EEEE, MMMM d'
  );
  let temp1 = nextData[1]['temp']['day'];
};
getWeatherData(lat, lon).then(weatherData => processWeatherData(weatherData));
