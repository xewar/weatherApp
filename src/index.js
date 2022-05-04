import './style.css';
import moonPhases from './moon.js';
import { format, addDays, compareAsc } from 'date-fns';

const { renderMoons } = moonPhases;
renderMoons();

let form = document.querySelector('form');

//Calls the functions to find weather from a location
let populateWeather = e => {
  e.preventDefault();
  let placeName = form.querySelector('input').value;
  getLatLon(placeName)
    .then(geoData => getWeatherData(geoData))
    .then(weatherData => processWeatherData(weatherData));
};

//Finds the lat/lon from the user input using the geocoding API
let getLatLon = async placeName => {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${placeName}&limit=1&appid=d690f17492f89e48239c79b3c0f9b19b
   `,
      { mode: 'cors' }
    );
    let responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.log(error);
  }
};

//Get weather using OpenWeather's One Call API 1.0 - Current weather plus daily forecast
let getWeatherData = async geoData => {
  let lat = geoData[0]['lat'];
  let lon = geoData[0]['lon'];
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

let processWeatherData = weatherData => {
  let todayData = weatherData['current'];
  let forecast = weatherData['daily'];

  //add sunrise and sunset times
  let sunriseTime = document.querySelector('.sunriseTime');
  let sunsetTime = document.querySelector('.sunsetTime');
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
    dayDiv.querySelector('.temperature').textContent = temp + '°';
    dayDiv.querySelector('.description').textContent = description;
  }
};
let fahrenheit = 1;
let temperatureConversion = () => {
  let convertTemperatures = temperature => {
    let temp = temperature.textContent;
    temp = +temp.slice(0, temp.length - 1);
    if (fahrenheit === 1) {
      temp = Math.round((temp - 32) * (5 / 9), 0);
    } else {
      temp = Math.round(temp * (9 / 5) + 32, 0);
    }
    temperature.textContent = temp + '°';
  };
  let temps = document.querySelectorAll('.temperature');
  temps = [...temps]; //convert to an array
  temps.forEach(temperature => convertTemperatures(temperature));
  fahrenheit === 1 ? (fahrenheit = 0) : (fahrenheit = 1);
};

let temperatureConversionButton = document.querySelector('button');
temperatureConversionButton.addEventListener('click', temperatureConversion);
form.addEventListener('submit', e => populateWeather(e));

//populating the page with data from NY upon page load
getLatLon('New York')
  .then(geoData => getWeatherData(geoData))
  .then(weatherData => processWeatherData(weatherData));
