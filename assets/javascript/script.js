var apiKey = '&APPID=9f142abae2a7a139bd1b6a03555f1348';

//Search bar variables
var searchForm = document.querySelector('#searchForm')
var cityInput = document.querySelector('#cityInput');
var searchBtn = document.querySelector('#searchBtn');
var searchHistory = document.querySelector('#searchHistoryBtnList');

var cities = []
var city
var lat
var lon

getSaved();

 //Function to handle the submission
  var formSubmitHandler = function (event) {
    event.preventDefault();
  
     var cityName = cityInput.value.trim();
  
    if (cityName) {
      getWeather(cityName);
      saveLocal(cityName);
      cityInput.value = ""
    } else {
      alert('Please enter a location.');
    }
  };

  //Function to convert city name to lat and lon
function getWeather(cityName) {
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1' + apiKey)
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
  //Fetch to retrieve today's weather in the searched location
    .then(function() {
      fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + apiKey + '&units=imperial')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);

        document.querySelector('#currentCityName').textContent = data.name;
        document.querySelector('#currentDate').textContent = (moment().format("dddd, MMMM Do, YYYY"));
        document.querySelector('#currentIcon').src =  'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
        document.querySelector('#currentTemp').textContent = 'Temperature: ' + data.main.temp + 'F';
        document.querySelector('#currentWind').textContent = 'Wind: ' + data.wind.speed + 'MPH';
        document.querySelector('#currentHumid').textContent = 'Humidity: ' + data.main.humidity + '%';

      })

    })
  //Fetch to retrieve the 5-day weather information
    .then(function() {
      fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + apiKey + '&units=imperial')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);

        document.querySelector('#date1').textContent = (moment().add(1, 'days').calendar("dddd, MMMM Do, YYYY"));
        document.querySelector('#icon1').src = 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png';
        document.querySelector('#temp1').textContent = 'Temperature: ' + data.list[0].main.temp + 'F';
        document.querySelector('#wind1').textContent = 'Wind: ' + data.list[0].wind.speed + 'MPH';
        document.querySelector('#humid1').textContent = 'Humidity: ' + data.list[0].main.humidity + '%';

        document.querySelector('#date2').textContent = (moment().add(2, 'days').calendar("dddd, MMMM Do, YYYY"));
        document.querySelector('#icon2').src = 'https://openweathermap.org/img/wn/' + data.list[1].weather[0].icon + '@2x.png';
        document.querySelector('#temp2').textContent = 'Temperature: ' + data.list[1].main.temp + 'F';
        document.querySelector('#wind2').textContent = 'Wind: ' + data.list[1].wind.speed + 'MPH';
        document.querySelector('#humid2').textContent = 'Humidity: ' + data.list[1].main.humidity + '%';

        document.querySelector('#date3').textContent = (moment().add(3, 'days').calendar("dddd, MMMM Do, YYYY"));
        document.querySelector('#icon3').src = 'https://openweathermap.org/img/wn/' + data.list[2].weather[0].icon + '@2x.png';
        document.querySelector('#temp3').textContent = 'Temperature: ' + data.list[2].main.temp + 'F';
        document.querySelector('#wind3').textContent = 'Wind: ' + data.list[2].wind.speed + 'MPH';
        document.querySelector('#humid3').textContent = 'Humidity: ' + data.list[2].main.humidity + '%';

        document.querySelector('#date4').textContent = (moment().add(4, 'days').calendar("dddd, MMMM Do, YYYY"));
        document.querySelector('#icon4').src = 'https://openweathermap.org/img/wn/' + data.list[3].weather[0].icon + '@2x.png';
        document.querySelector('#temp4').textContent = 'Temperature: ' + data.list[3].main.temp + 'F';
        document.querySelector('#wind4').textContent = 'Wind: ' + data.list[3].wind.speed + 'MPH';
        document.querySelector('#humid4').textContent = 'Humidity: ' + data.list[3].main.humidity + '%';

        document.querySelector('#date5').textContent = (moment().add(5, 'days').calendar("dddd, MMMM Do, YYYY"));
        document.querySelector('#icon5').src = 'https://openweathermap.org/img/wn/' + data.list[4].weather[0].icon + '@2x.png';
        document.querySelector('#temp5').textContent = 'Temperature: ' + data.list[4].main.temp + 'F';
        document.querySelector('#wind5').textContent = 'Wind: ' + data.list[4].wind.speed + 'MPH';
        document.querySelector('#humid5').textContent = 'Humidity: ' + data.list[4].main.humidity + '%';
      })

    })

};

//Function to save to local storage
function saveLocal(cityName) {

  cities.push(cityName)
  localStorage.setItem("cities", JSON.stringify(cities))
  getSaved()
};

//Function to get info from local storage
function getSaved() {
   cities = JSON.parse(localStorage.getItem("cities")) || []

   searchHistory.innerHTML = ""
   for (i = 0; i < cities.length; i++) {
    city = document.createElement("button")
    city.innerText = cities[i]
    city.addEventListener("click", function(event) {
    getWeather(event.target.innerText);
    })
    searchHistory.appendChild(city)
}};




searchBtn.addEventListener("click", formSubmitHandler)

