import './style.css';
import { format, addDays, compareAsc } from 'date-fns';

console.log('hello');
console.log('bye');
let placeName = 'London';

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
