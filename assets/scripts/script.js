window.onload = function() {

var apiKey = '98157aedd6d841e98672d290b1fdd56f';
var city = 'Calgary';
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


// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

function getApi() {

  var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + '&units=metric';

  fetch(queryUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    console.log(data);
    console.log(data.main.temp);
    temp.textContent = 'temp' + data.main.temp + '°C';
    humidity.textContent = 'humidity' + data.main.humidity + '%';
    wind.textContent = 'wind' + Math.round(data.wind.speed) * 3600/1000 + 'kph';
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

      for (var i = 0; i < forecastList.length; i = i + 8) {
        var nextDaysTemp = document.createElement('div');
        var nextDaysHumidity = document.createElement('div');
        var nextDaysWind = document.createElement('div');
        nextDaysTemp.textContent = 'temp' + forecastList[i].main.temp + '°C';
        nextDaysHumidity.textContent = 'humidity' + forecastList[i].main.humidity + '%';
        nextDaysWind.textContent = 'wind' + Math.round(forecastList[i].wind.speed) * 3600/1000 + 'kph';
        nextDays.appendChild(nextDaysTemp);
        nextDays.appendChild(nextDaysHumidity);
        nextDays.appendChild(nextDaysWind);
        console.log(data.length);
      }
    })
  }

  fetchButton.addEventListener('click', getApi);

};
//create a foor loop for


//When city name input on the id=city-search I am given a dropdown with suggestions
//when I click the chosen city or the search button it retrives the data from the api
//then it displays the current weather on the div current-day-weather
//and the next five days on the five-day-forecast div
//the searched cities stay on the local storage
//and when clicked again they take me back to the city's weather
//will need to create new buttons as the cities are added