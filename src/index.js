import './style.css';

console.log('hello');
console.log('bye');
let placeName = 'London';

let getLatLon = async placeName => {};
let lat = 33.44;
let lon = -94.04;
let getWeather = async (lat, lon) => {
  try {
    //Current Weather data
    // let response = await fetch(
    //   `http://api.openweathermap.org/data/2.5/weather?q=${placeName}&APPID=d690f17492f89e48239c79b3c0f9b19b
    // `,
    //   { mode: 'cors' }
    // );
    //One Call API 1.0 - Current weather plus daily forecast
    let exclude = 'minutely,hourly,alerts';
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=d690f17492f89e48239c79b3c0f9b19b
      `,
      { mode: 'cors' }
    );
    let responseJSON = await response.json();
    console.log(responseJSON);
  } catch (error) {
    console.log(error);
  }
};
getWeather(lat, lon);
