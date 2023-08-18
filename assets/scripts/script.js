window.onload = function() {

var apiKey = '98157aedd6d841e98672d290b1fdd56f';

// var state;
// var country;
var fetchButton = document.getElementById('search-button');
var currentDayWeather = document.getElementById('current-day-weather');
var temp = document.getElementById('current-temp');
var humidity = document.getElementById('current-humidity');
var wind = document.getElementById('current-wind');
var nextDays = document.getElementById('five-day-forecast');
// var currentDateVar = Date();
// var currentDate = document.getElementById('current-date');
var inputCity = document.getElementById('city-search');

// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

function getApi() {
  var city = inputCity.value;
  saveHistory(city);
  var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + '&units=metric';


  fetch(queryUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    console.log(data);
    console.log(data.main.temp);
    temp.textContent = 'Temp: ' + data.main.temp + '°C';
    humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
    wind.textContent = 'Wind: ' + Math.round(data.wind.speed) * 3600/1000 + 'kph';
    // currentDate.textContent = currentDateVar;
    fiveDayForecast(data.coord.lat, data.coord.lon);
  });

}

  function fiveDayForecast(lat, lon){
    console.log(lat, lon);
    var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var forecastList = data.list;

      nextDays.innerHTML = "";

      for (var i = 0; i < forecastList.length; i = i + 8) {
        var nextDaysTemp = document.createElement('div');
        var nextDaysHumidity = document.createElement('div');
        var nextDaysWind = document.createElement('div');
        nextDaysTemp.textContent = 'Temp: ' + forecastList[i].main.temp + '°C';
        nextDaysHumidity.textContent = 'Humidity: ' + forecastList[i].main.humidity + '%';
        nextDaysWind.textContent = 'Wind: ' + Math.round(forecastList[i].wind.speed) * 3600/1000 + 'kph';
        nextDays.appendChild(nextDaysTemp);
        nextDays.appendChild(nextDaysHumidity);
        nextDays.appendChild(nextDaysWind);
        console.log(data.length);
      }
    })
  }

  fetchButton.addEventListener('click', getApi);

};


function saveHistory(cityValue){
  var cityArray = JSON.parse(localStorage.getItem("cities")) || [];
  cityArray.push(cityValue);
  localStorage.setItem("cities", JSON.stringify(cityArray));
  var historyButtons = document.getElementById('history-buttons');

  historyButtons.innerHTML = "";

  for (let i = 0; i < cityArray.length; i++) {
    var cityHistory = document.createElement('button');
    cityHistory.textContent = cityArray[i];
    historyButtons.appendChild(cityHistory);
    console.log(cityArray[i]);
  }

}


//use bootstrap to style the page