var searchbutton = document.getElementById("myBtn");
var cityInput = document.getElementById("search");
var cityInfo = document.getElementById("city-information")
var apiKey = "&appid=9c7881d5031a58d77d2e3fe72d63dc85"
var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=25.7617&lon=80.1918" + apiKey;
//Get weather for city
var getCityWeatherInfo = function() {
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data.current.humidity);
        console.log(data.current.temp);

        //var temp = document.createElement("h2")
       // temp.innerText = "temperatue: " + data.current.temp
       // console.log(temp);
       // cityInfo.append(temp);
    })

}



searchbutton.addEventListener("click", getCityWeatherInfo)