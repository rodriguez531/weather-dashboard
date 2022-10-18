var ApiKey = "9c7881d5031a58d77d2e3fe72d63dc85";
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#username");
var cityContainerEl = document.querySelector("#repos-container");
var citySearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function (event) {
    //prevent page from refreshing
    event.preventDefault();

    //get value from input elememt
    var cityname = cityInputEl.value.trim();

    if (cityname) {
        getWeatherData(cityname);
        cityInputEl.value = "";
    } else {
        alert("please enter a city name");
    }
};


var getWeatherData = function (cityName) {
    //format the weather forecast api url 
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=9c7881d5031a58d77d2e3fe72d63dc85";
    //make a request to url
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            var apiUrl2 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=9c7881d5031a58d77d2e3fe72d63dc85&units=imperial"
            fetch(apiUrl2).then(function (response) {
                response.json().then(function (data) {
                    displayWeatherData(data, cityName);
                });
            });

        });
    });
};

var displayWeatherData = function (dailyWeather, searchTerm) {
    console.log(dailyWeather);
    console.log(searchTerm);

    //check if api returned 
    if (dailyWeather.length === 0) {
        cityContainerEl.textContent = "No city found.";
        return;
    }

    citySearchTerm.textContent = searchTerm;


    //clear old content
    cityContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm;
    var currentList = dailyWeather.list

    //loop over repos
    for (var i = 1; i < currentList.length; i += 8) {
        // format city name
        var forecastData = "Temp: " + currentList[i].main.temp + "F"
        var forecastWind = "Wind: " + currentList[i].wind.speed + "MPH"
        var forecastHumidity = "Humidity: " + currentList[i].main.humidity + "%"
        // var weatherIcon = 
        console.log(currentList[i])
        // create a container for each day
        var forecastEl = document.createElement("div");
        forecastEl.classList = "list-item flex-row justify-space-between align-center";
        
        //create a span element to hold the forecast day name
        var titleEl = document.createElement("p");
        titleEl.textContent = forecastData;
        var tempEl = document.createElement("p");
        tempEl.textContent = forecastData
        var windEl = document.createElement("p");
        windEl.textContent = forecastWind
        var humidityEl = document.createElement("p");
        humidityEl.textContent = forecastHumidity
        //append to container
        forecastEl.appendChild(titleEl);
        forecastEl.appendChild(tempEl);
        forecastEl.appendChild(windEl);
        forecastEl.appendChild(humidityEl);
        //append container to the dom
        cityContainerEl.appendChild(forecastEl);
    }
};




userFormEl.addEventListener("submit", formSubmitHandler);