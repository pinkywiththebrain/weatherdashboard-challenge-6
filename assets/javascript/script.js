var apiKey = '&APPID=9f142abae2a7a139bd1b6a03555f1348';
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//Search bar variables
var searchForm = document.querySelector('#searchForm')
var cityInput = document.querySelector('#cityInput');
var searchBtn = document.querySelector('#searchBtn');
var searchHistory = document.querySelector('#searchHistoryBtnList');
//Today's weather variables
var currentCityName = document.querySelector('#currentCityName')
var currentDate = document.querySelector('#currentDate')
var currentIcon = document.querySelector('#currentIcon')
var currentTemp = document.querySelector('#currentTemp')
var currentWind = document.querySelector('#currentWind')
var currentHumid = document.querySelector('#currentHumid')

var cityName
var lat
var lon

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    cityName = cityInput.value.trim();
  
    if (cityName) {
      getWeather(cityName);
  
    } else {
      alert('Please enter a location.');
    }
  };

  //Function to convert city name to lat and lon
function getWeather(cityName) {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1' + apiKey)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        console.log(data[0].lat)
        console.log(data[0].lon)

        lat = (data[0].lat)
        lon = (data[0].lon)
    })

    .then(function() {
      fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + apiKey)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data)
      })
      

    })
};

// getWeather()

 searchBtn.addEventListener("click", formSubmitHandler)

