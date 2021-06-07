var api = "http://api.openweathermap.org/data/2.5/"
var apiKey = "&appid=b4336847d5ce4a4bf6c2c22ee6ac5206"
var cityName = $(".city-name")[0].textContent;
var currentIcon = $("#current-icon")
var currentTemp = $(".city-temp")
var currentWind = $(".city-wind")
var currentHumidity = $(".city-humidity")
var currentUv = $(".city-uv")

// date displays
$(".current-date").text(" (" + moment().format('L') + ")");
$(".day-1").text(moment().add(1, "days").format("L"));
$(".day-2").text(moment().add(2, "days").format("L"));
$(".day-3").text(moment().add(3, "days").format("L"));
$(".day-4").text(moment().add(4, "days").format("L"));
$(".day-5").text(moment().add(5, "days").format("L"));

var kToF = function(kelvin){
    return ((kelvin - 273.15) * (9/5) + 32).toFixed(2)
}

var mpsToMph = function(mps){
    return (mps * 2.237).toFixed(2)
}

var currentWeather = function(city){
    var apiUrl = (api + "weather?q=" + city + apiKey)

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            var icon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
            currentIcon.attr("src", icon)
            currentTemp.html("Temp: " + kToF(data.main.temp) + "&#8457;")
            currentWind.text("Wind: " + mpsToMph(data.wind.speed) + " MPH")
            currentHumidity.text("Humidity: " + data.main.humidity + " %")
            var lat = data.coord.lat
            console.log(lat)
            var lon = data.coord.lon

            fetch(api + "onecall?lat=" + lat + "&lon=" + lon + apiKey).then(function(response){
                response.json().then(function(data){
                    if(data.current.uvi >= 6)
                        currentUv.html("UV Index: " + "<span class='high'>" + data.current.uvi + "</span>")
                    else if(data.current.uvi >= 3 && data.current.uvi <= 5){
                        currentUv.html("UV Index: " + "<span class='medium'>" + data.current.uvi + "</span>")
                    }
                    else(
                        currentUv.html("UV Index: " + "<span class='low'>" + data.current.uvi + "</span>")
                    )
                })
            })
        })
    })
}

var forecastIcons = function(city){
    
}

currentWeather(cityName)