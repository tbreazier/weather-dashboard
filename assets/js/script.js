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
var apiKey = "36e4a7f59c83e4a1f4357162c1a5f93b";
var city = "";
var searchedCities = [];
var icon = $("<img>");
var currentCity = $("#city-name");
var cityTempEl = document.getElementById("city-temp");
var cityHumidityEl = document.getElementById("city-humidity");
var cityWindEl = document.getElementById("city-wind");
var cityUvIndexEl = document.getElementById("city-uv");
var currentDate = moment().format("MM/DD/YYYY");

currentCity.text(city);

//Current Weather + UV
function getWeather(userCity) {

    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&APPID=" + apiKey + "&units=imperial";

    currentCity.text(userCity + " " + currentDate + " ");

    fetch(url).then(function(response) {
        response.json().then(function(data) {

        function renderCurrentConditions() {

            var iconcode = data.weather[0].icon;

            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            icon.attr('src', iconurl);
            currentCity.append(icon);

            cityTempEl.innerHTML = "Temperature: " + data.main.temp + "°F";
            cityHumidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";
            cityWindEl.innerHTML = "Wind Speed: " + data.wind.speed;
        }

        var lat = data.coord.lat;
        var lon = data.coord.lon;

        var uvIndexUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&;lon=" + lon + "&APPID=" + apiKey;
        renderCurrentConditions();

        fetch(uvIndexUrl).then(function(response) {
            response.json().then(function(data) {
           cityUvIndexEl.innerHTML = "UV Index: " + data.value;
        });
    });
    $(".current-weather").removeClass("hide");
    }).catch(function (error){
        alert("Error: " + response.statusText);
    });
});

//Five Day Forecast
var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&mode=json&APPID=" + apiKey + "&units=imperial";

fetch(forecastUrl)
.then(function(response) {
    response.json().then(function(data) {
    
        var x = 1;
        for (var i = 5; i < data.list.length; i = i + 8) {
            $("#day" + x).text(data.list[i].dt_txt);
            var iconcode = data.list[i].weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $("#icon" + x).attr("src", iconurl);
            $("#temp" + x).text("Temp: " + data.list[i].main.temp + "°F");
            $("#humidity" + x).text("Humidity: " + data.list[i].main.humidity + "%");
            x++;
            }
        });
        $("#five-day").removeClass("hide");
        $("#day-cards").removeClass("hide");
        });
    };

$(document).on("click", ".city-list", function (event) {
    var buttonText = $(this).text();
    getWeather(buttonText);
});

// Delete History
$(document).on("click", ".delete-icon", function (event) {
    var deletedCity = $(this).parent().text();

    searchedCitiesString = localStorage.getItem("searchedCities");
    searchedCities = JSON.parse(searchedCitiesString);

    searchedCities = searchedCities.filter(city => {
        return city != deletedCity;
    });

    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));

    displayHistory();

    location.reload();
});
//Display History
function displayHistory() {

    $(".list-group").empty();
    searchedCitiesString = localStorage.getItem("searchedCities");

    searchedCities = JSON.parse(searchedCitiesString);
    if (searchedCities === null) {
        searchedCities = [];
    }

    searchedCities.forEach(function (searchedCity) {
        var liElement = $("<li class=list-group-item>");
        liElement.addClass("city-list");
        liElement.text(searchedCity);

        var trashIcon = $("<span class='oi oi-trash'></span>");
        trashIcon.addClass("delete-icon");
        liElement.append(trashIcon);
        $(".list-group").append(liElement);
    });
};

displayHistory();

//Search Click Handler
$("#search-btn").on("click", function (event) {
    event.preventDefault();

    if ($("#search-city").val() != "") {
        city = $("#search-city").val();

        searchedCities.push(city);
        localStorage.setItem("searchedCities", JSON.stringify(searchedCities));

        displayHistory();

        getWeather(city);
    }
    $("#search-city").val("");
});
