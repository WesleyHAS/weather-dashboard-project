document.addEventListener("DOMContentLoaded", function() {

// API key for OpenWeatherMap
var apiKey = '98157aedd6d841e98672d290b1fdd56f';

// Element variables
var fetchButton = document.getElementById('search-button');
var currentDayWeather = document.getElementById('current-day-weather');
var temp = document.getElementById('current-temp');
var humidity = document.getElementById('current-humidity');
var wind = document.getElementById('current-wind');
var nextDays = document.getElementById('five-day-forecast');
var inputCity = document.getElementById('city-search');
var messageDisplay = document.getElementById('message-display'); // Define the message display element

// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// Clear history button event listener
var clearHistoryButton = document.getElementById('clear-history-button');
clearHistoryButton.addEventListener('click', function() {
  clearHistory();
  historyButtons.innerHTML = ""; // Clear the history buttons display
  location.reload(); // Reload the page
});

// Function to clear search history
function clearHistory() {
  localStorage.removeItem("cities");
}

// Function to fetch weather data from the API
function getApi(city) {
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + '&units=metric';

  fetch(queryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(function (data) {
      
      var currentDate = new Date(); // Get the current date
      var formattedDate = currentDate.toLocaleDateString('en-US');
      var currentDateElement = document.getElementById('current-date'); // Get the current date element
      currentDateElement.textContent = 'Date: ' + formattedDate;
      
      // Display current weather information
      temp.textContent = 'Temp: ' + data.main.temp + '°C';
      humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
      wind.textContent = 'Wind: ' + Math.round(data.wind.speed) * 3600/1000 + 'kph';
      
      // Fetch and display 5-day forecast
      fiveDayForecast(data.coord.lat, data.coord.lon);
      
      messageDisplay.textContent = ""; // Clear the message display
      
      // If the city is valid, save it to history and create a new button
      saveHistory(city);
    })
    .catch(function (error) {
      console.error('Error fetching data:', error);
      messageDisplay.textContent = "Invalid city entered. Please try again.";
    });
}

// Function to fetch and display 5-day forecast
function fiveDayForecast(lat, lon) {
  var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      var forecastList = data.list;

      nextDays.innerHTML = "";

      for (var i = 0; i < forecastList.length; i = i + 8) {
        var dayForecastContainer = document.createElement('div'); // Create a container for each day's forecast
        dayForecastContainer.classList.add('forecast-card', 'day-forecast'); // Add the styles as classes

        var forecastDate = new Date(forecastList[i].dt * 1000); // Convert timestamp to date object
        var dayOfWeek = forecastDate.toLocaleDateString('en-US', { weekday: 'long' }); // Get the day of the week
        var date = forecastDate.toLocaleDateString('en-US'); // Get the actual date

        var dayInfo = document.createElement('div'); // Create an element for the day information
        dayInfo.textContent = dayOfWeek + ', ' + date;
        dayForecastContainer.appendChild(dayInfo); // Append the day information element

        var nextDaysTemp = document.createElement('div');
        var nextDaysHumidity = document.createElement('div');
        var nextDaysWind = document.createElement('div');

        nextDaysTemp.textContent = 'Temp: ' + forecastList[i].main.temp + '°C';
        nextDaysHumidity.textContent = 'Humidity: ' + forecastList[i].main.humidity + '%';
        nextDaysWind.textContent = 'Wind: ' + Math.round(forecastList[i].wind.speed) * 3600/1000 + 'kph';

        // Append the three data elements to the day's container
        dayForecastContainer.appendChild(nextDaysTemp);
        dayForecastContainer.appendChild(nextDaysHumidity);
        dayForecastContainer.appendChild(nextDaysWind);

        nextDays.appendChild(dayForecastContainer);
      }
    })
    .catch(function (error) {
      console.error('Error fetching data:', error);
    });
}

// Search button click event listener
fetchButton.addEventListener('click', function() {
  var city = inputCity.value.trim();
  if (!city) {
    messageDisplay.textContent = "Please enter a city name."; // Display a message if no city is entered
    return;
  }

  // Check if the city is valid using the getApi function
  getApi(city);
});


// Function to save city search history
function saveHistory(cityValue) {
  var cityArray = JSON.parse(localStorage.getItem("cities")) || [];
  var historyButtons = document.getElementById('history-buttons');

  if (cityValue && !cityArray.includes(cityValue)) {
    cityArray.push(cityValue);
    localStorage.setItem("cities", JSON.stringify(cityArray));
  }

  historyButtons.innerHTML = "";

  for (let i = 0; i < cityArray.length; i++) {
    var cityHistory = document.createElement('button');
    cityHistory.classList.add('city-button');
    cityHistory.textContent = cityArray[i];

    // Attach click event listener to each city button
    cityHistory.addEventListener('click', function() {
      getApi(cityArray[i]); // Fetch weather data for the clicked city
    });

    historyButtons.appendChild(cityHistory);
  }
}


// Event listener for history buttons
var historyButtons = document.getElementById('history-buttons');
historyButtons.addEventListener('click', function(event) {
  if (event.target.classList.contains('city-button')) {
    var clickedCity = event.target.textContent;
    getApi(clickedCity); // Fetch weather data for the clicked city
    messageDisplay.textContent = ""; // Clear the message display
  }
});


saveHistory();
});