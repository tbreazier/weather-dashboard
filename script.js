//Project Steps
//1. Create HTML w/bootstrap grid and classes
//2. Review API documentation
//3. Create JS functions for
//  a. User searched city weather
//  b. Current forecast + five day forecast
//  c. History of searches 
//  d. Click handler
//4. Add CSS styling
//5. Deploy application

//Global Variables
var city = "";
var cityHistory = [];
var apiKey = "36e4a7f59c83e4a1f4357162c1a5f93b";
var iconEl = document.querySelector("img");
var currentCityEl = document.querySelector("city-name");
var cityFormEl = document.querySelector("city-search");
var date = moment().format("MM/DD/YYYY");

currentCityEl.textContent(city);

//Current Weather Function
function currentWeather(userInput) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + apiKey;

    currentCityEl.textContent(userInput + " " + date + " ");

    fetch(apiURL)
    .then(function(response) {
        console.log(response);
    });
};



//Five Day Forecast Function

//Display Weather

//Save Searches

//Load History

//Click Handler


