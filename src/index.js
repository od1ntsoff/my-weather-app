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

function convertFarenheit(event) {
  event.preventDefault();
  let farenheit = document.querySelector("#temp");
  farenheit.innerHTML = 78;
}
let replaceFarenheit = document.querySelector("#farenheit");
replaceFarenheit.addEventListener("click", convertFarenheit);

function convertCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#temp");
  celsius.innerHTML = 26;
}
let replaceCelsius = document.querySelector("#celsius");
replaceCelsius.addEventListener("click", convertCelsius);

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  let h1 = document.querySelector("h1");
  if (cityInput.value) {
    h1.innerHTML = `${cityInput.value}`;
  } else {
    alert(`Please enter your city`);
  }
  let key = "bc1c6f1266bbc4061cb1b2ae362057fa";
  let city = `${cityInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
  axios.get(`${apiUrl}&appid=${key}`).then(showTemperature);
}
let cityForm = document.querySelector("#city-search");
cityForm.addEventListener("submit", searchCity);

function showTemperature(response) {
  console.log(response);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity-level");
  humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `Wind ${Math.round(response.data.wind.speed)} km/h`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "bc1c6f1266bbc4061cb1b2ae362057fa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${key}`).then(showTemperature);
}

function getCurrentCity() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCity = document.querySelector("#gps-button");
currentCity.addEventListener("click", getCurrentCity);
