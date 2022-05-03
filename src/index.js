import './style.css';
import { format, addDays, compareAsc } from 'date-fns';

//moon phases

let addMoonToDOM = (moonPhase, date, index) => {
  let dayDiv = document.getElementById(`day${index}`);
  let containMoon = dayDiv.children[0];
  containMoon.innerHTML = moonPhase;
  containMoon.firstChild.firstChild.children[2].remove();
};
let renderMoons = () => {
  for (let i = 0; i < 5; i++) {
    let date = addDays(new Date(), i);
    let configMoon = {
      day: date.getDay(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      size: 50,
      lightColor: 'rgba(255, 72, 176, .4)',
      shadeColor: 'rgba(255,255,255,0)', //transparent
      texturize: false,
    };
    loadMoonPhases(configMoon, date, i); //loads the phase for that date and adds it to the DOM in its callback
  }
};
renderMoons();

function loadMoonPhases(moonObj, date, index) {
  console.log('date is:', date);
  var gets = [];
  for (var i in moonObj) {
    gets.push(i + '=' + moonObj[i]);
  }
  gets.push('LDZ=' + new Date(moonObj.year, moonObj.month - 1, 1) / 1000);
  var xmlhttp = new XMLHttpRequest();
  var url = 'https://www.icalendar37.net/lunar/api/?' + gets.join('&');
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      let allPhases = JSON.parse(xmlhttp.responseText);
      addMoonToDOM(allPhases.phase[date.getDay() + 1].svg, date, index);
    }
  };
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}

// load_moon_phases(configMoon, findPhase);

// let getLatLon = async placeName => {};
// let lat = 40.7128;
// let lon = -74.006;
// let getWeatherData = async (lat, lon) => {
//   try {
//     //One Call API 1.0 - Current weather plus daily forecast
//     let exclude = 'minutely,hourly,alerts';
//     let response = await fetch(
//       `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=${exclude}&appid=d690f17492f89e48239c79b3c0f9b19b
//       `,
//       { mode: 'cors' }
//     );
//     let responseJSON = await response.json();
//     return responseJSON;
//   } catch (error) {
//     console.log(error);
//   }
// };
// let todayDiv = document.getElementById('day0');
// let tomorrowDiv = document.getElementById('day1');
// let sunriseTime = document.querySelector('.sunriseTime');
// let sunsetTime = document.querySelector('.sunsetTime');

// let temperatureConversion = (temp, unit) => {};

// let processWeatherData = weatherData => {
//   console.log(weatherData);
//   let todayData = weatherData['current'];

//   //today
//   let todaysDate = format(new Date(todayData['dt'] * 1000), 'EEEE, MMMM d');
//   let todaysDateDiv = todayDiv.querySelector('.date');
//   todaysDateDiv.textContent = todaysDate;
//   let sunrise = format(new Date(todayData['sunrise'] * 1000), 'HH:mm');
//   let sunset = format(new Date(todayData['sunset'] * 1000), 'HH:mm');
//   sunriseTime.textContent = sunrise;
//   sunsetTime.textContent = sunset;
//   let temp0 = Math.round(todayData['temp'], 0);
//   let description0 = todayData['weather'][0]['description'];
//   todayDiv.querySelector('.temperature').textContent = temp0 + '°';
//   todayDiv.querySelector('.description').textContent = description0;

//   //tomorrow
//   let nextData = weatherData['daily'];
//   let tomorrowsDate = format(
//     new Date(nextData[1]['dt'] * 1000),
//     'EEEE, MMMM d'
//   );
//   let temp1 = nextData[1]['temp']['day'];
// };
// getWeatherData(lat, lon).then(weatherData => processWeatherData(weatherData));
