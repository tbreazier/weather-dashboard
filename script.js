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
var date = moment().format("MM/DD/YYYY");

var formSubmitHandler = function(event) {
    event.prevent.default();
    var cityInput = currentCityEl.nodeValue.trim();
};

//Current Weather Function
var getCurrentWeather = function(userCity) {
    var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey;
    
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data.items, language);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

//Five Day Forecast Function

//Click Handler

//Load History
