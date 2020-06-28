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
var currentCity = document.querySelector("city-name");
var date = moment().format("MM/DD/YYYY");