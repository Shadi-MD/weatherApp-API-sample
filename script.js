let inputElem = document.querySelector(".search-input");
let currentCity = document.querySelector(".current-city");
let dataElem = document.querySelector(".current-date");
let submitBtn = document.querySelector(".search-button");
let tempElem = document.querySelector(".current-temperature-value");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let info = document.querySelector(".info");
let icon = document.querySelector(".current-temperature-icon");

let apiKey = "20fb605b4a20d8452ab62fbfto73c4a8";
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

function enterCity(event) {
  event.preventDefault();

  let userCity = inputElem.value;
  currentCity.innerHTML = userCity;
  changeDate(now);
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${inputElem.value}&key=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
  inputElem.value = "";
}

function changeDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  dataElem.innerHTML = `${day} ${hours}:${minutes}`;
}
function showTemp(response) {
  tempElem.innerHTML = Math.floor(response.data.temperature.current);
  humidity.innerHTML = Math.floor(response.data.temperature.humidity);
  wind.innerHTML = Math.floor(response.data.wind.speed);
  info.innerHTML = response.data.condition.description;
  icon.innerHTML = `<img src="${response.data.condition.icon_url}">`;
  console.log(response.data);
}
submitBtn.addEventListener("click", enterCity);
