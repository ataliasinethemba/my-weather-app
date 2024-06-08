function showWeatherDetails(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windSpeedElement = document.querySelector("#windspeed");
  windSpeedElement.innerHTML = response.data.wind.speed;
  let iconImage= document.querySelector(".current-temperature-icon");
  iconImage.innerHTML=`<img src="${response.data.condition.icon_url}"/>`;

  getForecast(response.data.city);
}

function search(city) {
  

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherDetails);
}
function handleSearchButton(event){
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
function displayForecast(response){
  
  let forecastHTML="";
  response.data.daily.forEach(function(day,index){
    if(index<5){
    forecastHTML=forecastHTML+`<div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <div class="weather-forecast-icon"><img
        src="${day.condition.icon_url}"
        width="40"
      /></div>
      <div class="weather-forecast-temperature">
        <span><strong class="max-temperature">  ${Math.round(day.temperature.maximum) }°</strong></span>
        <span class="min-temperature">  ${Math.round(day.temperature.minimum) }° </span>
      </div>
    </div>`;}
  });

    let weatherforecast = document.querySelector("#forecast");
    weatherforecast.innerHTML=forecastHTML;
  }

function getForecast(city){
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;  
  axios.get(apiUrl).then(displayForecast);
}
function formatDay(timestamp){
  let date = new Date(timestamp*1000);
  let days=[
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat"
  ];
  return days[date.getDay()];
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchButton);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
search("fochville");
