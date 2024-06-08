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
function displayForecast(){
  
  let days=["Mon","Tue","Wed","Thur","Friday"];
  let forecastHTML="";
  days.forEach(function(day){
    forecastHTML=forecastHTML+`<div class="weather-forecast-day">
      <div class="weather-forecast-date">${day}</div>
      <div class="weather-icon"><img
        src="http://openweathermap.org/img/wn/50d@2x.png"
        width="40"
      /></div>
      <div class="weather-forecast-temperature">
        <strong class="max-temperature"> 29&deg; </strong>
        <span class="min-temperature"> 20&deg; </span>
      </div>
    </div>`
  });

  let weatherforecast = document.querySelector("#forecast");
  weatherforecast.innerHTML=forecastHTML;
  }
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchButton);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
search("fochville");
displayForecast();