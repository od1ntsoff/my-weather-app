let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = days[now.getDay()];
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();

let h2 = document.querySelector("h2");
h2.innerHTML = `${weekDay} ${date}.${month} | ${hour}:${minute}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" 
            alt="" 
            width="42">
            <div class="weather-forecast-temperatures"> 
             <span class="weather-forecast-temperature-max">${Math.round(
               forecastDay.temp.max
             )}°</span>
             <span class="weather-forecast-temperature-min">${Math.round(
               forecastDay.temp.min
             )}°</span>
            </div>
          </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates.lat);
  let key = "bc1c6f1266bbc4061cb1b2ae362057fa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
  axios.get(`${apiUrl}&appid=${key}`).then(displayForecast);
}

function showTemperature(response) {
  console.log(response);
  let temperature = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let feelslike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity-level");
  let wind = document.querySelector("#wind-speed");
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  temperature.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  feelslike.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;
  humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind ${Math.round(response.data.wind.speed)} m/h`;
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "bc1c6f1266bbc4061cb1b2ae362057fa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${key}`).then(showTemperature);
}

function searchCity(city) {
  let key = "bc1c6f1266bbc4061cb1b2ae362057fa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
  axios.get(`${apiUrl}&appid=${key}`).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-city-input");
  searchCity(cityInputElement.value);
}

let cityForm = document.querySelector("#search-city-input");
cityForm.addEventListener("submit", handleSubmit);

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCity = document.querySelector("#gps-button");
currentCity.addEventListener("click", getCurrentCity);

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

function changeBackground() {
  let date = new Date();
  let day = date.getHours();
  if (day >= 5 && day < 9) {
    document.getElementById("backgroundimg").className = "dawn";
  } else if (day >= 9 && day < 12) {
    document.getElementById("backgroundimg").className = "sunny";
  } else if (day >= 12 && day < 15) {
    document.getElementById("backgroundimg").className = "clouds";
  } else if (day >= 15 && day < 18) {
    document.getElementById("backgroundimg").className = "fog";
  } else if (day >= 18 && day < 21) {
    document.getElementById("backgroundimg").className = "storm";
  } else {
    document.getElementById("backgroundimg").className = "night";
  }
}

searchCity("Zhytomyr");
changeBackground();
