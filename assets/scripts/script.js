window.onload = function() {

var apiKey = '98157aedd6d841e98672d290b1fdd56f';
var city;
// var state;
// var country;

var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

fetch(queryUrl);
};

//When city name input on the id=city-search I am given a dropdown with suggestions
//when I click the chosen city or the search button it retrives the data from the api
//then it displays the current weather on the div current-day-weather
//and the next five days on the five-day-forecast div
//the searched cities stay on the local storage
//and when clicked again they take me back to the city's weather
//will need to create new buttons as the cities are added