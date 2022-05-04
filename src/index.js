import './style.css';
import moonPhases from './moon.js';
import { format, addDays, compareAsc } from 'date-fns';

const { renderMoons } = moonPhases;
renderMoons();

let form = document.querySelector('form');

//Finds the lat/lon from the user input using the geocoding API
let getLatLon = async e => {
  e.preventDefault();
  let placeName = form.querySelector('input').value;
  try {
    let response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${placeName}&limit=1&appid=d690f17492f89e48239c79b3c0f9b19b
   `,
      { mode: 'cors' }
    );
    let responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.log(error);
  }
};
let populateWeather = e => {
  getLatLon(e)
    .then(geoData => getWeatherData(geoData))
    .then(weatherData => processWeatherData(weatherData));
};
form.addEventListener('submit', e => populateWeather(e));

let getWeatherData = async geoData => {
  let lat = geoData[0]['lat'];
  let lon = geoData[0]['lon'];
  //One Call API 1.0 - Current weather plus daily forecast
  try {
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
let todayDiv = document.getElementById('day0');
let tomorrowDiv = document.getElementById('day1');
let sunriseTime = document.querySelector('.sunriseTime');
let sunsetTime = document.querySelector('.sunsetTime');

let temperatureConversion = (temp, unit) => {};

let processWeatherData = weatherData => {
  console.log(weatherData);
  let todayData = weatherData['current'];
  let forecast = weatherData['daily'];

  //add sunrise and sunset times
  let sunrise = format(new Date(todayData['sunrise'] * 1000), 'HH:mm');
  let sunset = format(new Date(todayData['sunset'] * 1000), 'HH:mm');
  sunriseTime.textContent = sunrise;
  sunsetTime.textContent = sunset;

  //loop and add temperature data to DOM
  for (let i = 0; i < 5; i++) {
    let date = format(new Date(forecast[i]['dt'] * 1000), 'EEEE, MMMM d');
    let temp = forecast[i]['temp']['day']; //temperature is the 'day' temperature, rather than current, high, low, etc.
    temp = Math.round(temp, 0);
    let description = forecast[i]['weather'][0]['description'];
    let dayDiv = document.getElementById(`day${i}`);
    dayDiv.querySelector('.date').textContent = date;
    dayDiv.querySelector('.temperature').textContent = temp;
    dayDiv.querySelector('.description').textContent = description;
  }
};
