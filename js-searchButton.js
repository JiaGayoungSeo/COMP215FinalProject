$(document).ready(function(){
    var mainElement = document.getElementById("weatherLog");

    $("#SearchButton").click(
        function (evt) {

            var xhttp = new XMLHttpRequest(); // (1) create an XMLHttpRequest object

            //(2) Important part: implement an eventhandler that is called
            //when the XMLHttpReqest Object
            //has received a response(or an error)
            xhttp.onreadystatechange = function () {
                //Call back function (event handler)
                //process response from the server.
                if (this.readyState == 4 && this.status == 200) {

                    var SearchResponse = this.responseText;

                    var obj = JSON.parse(SearchResponse);

                    var city_name = obj["name"];
                    var country_name = obj["sys"]["country"];
                    var weather_description = obj["weather"][0]["description"];
                    var longitude = obj["coord"]["lon"];
                    var latitude = obj["coord"]["lat"];
                    var temp = obj["main"]["temp"] - 273.15;
                    var pressure = obj["main"]["pressure"];
                    var wind_speed = obj["wind"]["speed"];
                    var humidity = obj["main"]["humidity"];
                    var wind_direction = obj["wind"]["deg"];
                    var sunrise = new Date(obj["sys"]["sunrise"] * 1000).toLocaleTimeString();
                    var sunset = new Date(obj["sys"]["sunset"] * 1000).toLocaleTimeString();

                    var convertedTemp = temp.toFixed(2); //Setting decimal places of converted temperature.

                    var SearchResultsHTML = "City: " + city_name + "<br />" +
                        "Country: " + country_name + "<br />" +
                        "Weather: " + weather_description + "<br />";
                    //if statements for the checkbox.
                    //Initially the checkboxes are checked and gives us the full result when we trigger a search.
                    //But user can uncheck checkboxes that they dont need on the results that will be printed,
                    //Take not that full results will still be available in the table logs.
                    if ($('#checkLongitude').is(':checked')) {
                        SearchResultsHTML += "Longitude: " + longitude + "<br />";
                    }
                    if ($('#checkLatitude').is(':checked')) {
                        SearchResultsHTML += "Latitude: " + latitude + "<br />";
                    }
                    if ($('#checkTemperature').is(':checked')) {
                        SearchResultsHTML += "Temperature: " + convertedTemp + "°C" + "<br />";
                    }
                    if ($('#checkPressure').is(':checked')) {
                        SearchResultsHTML += "Pressure: " + pressure + "<br />";
                    }
                    if ($('#checkHumidity').is(':checked')) {
                        SearchResultsHTML += "Humidity: " + humidity + "<br />";
                    }
                    if ($('#checkWindSpeed').is(':checked')) {
                        SearchResultsHTML += "Wind Speed: " + wind_speed + "<br />";
                    }
                    if ($('#checkWindDirection').is(':checked')) {
                        SearchResultsHTML += "Wind Direction: " + wind_direction + "<br />";
                    }
                    if ($('#checkSunrise').is(':checked')) {
                        SearchResultsHTML += "Sunrise: " + sunrise + "<br />";
                    }
                    if ($('#checkSunset').is(':checked')) {
                        SearchResultsHTML += "Sunset: " + sunset + "<br />";
                    }

                    $("#currentWeather").html(SearchResultsHTML);

                    //create a table to log the results of each search that is made.
                    weatherTable(obj);

                };
            }

            var CityName = $("#txtCityName").val();
            var txtCountryCode = $("#txtCountryCode").val();
            var Postal = $("#txtPostalCode").val();
            var CountryCodeTxt = $("#CountryCodetxt").val();
            var Latitude1 = $("#txtLatitude").val();
            var Longtitude1 = $("#txtLongtitude").val();
            var apiKey = "0ce883d431a40d2f3301142f74f3dd8e";

            if (document.getElementById('radioCity').checked) {
                SearchString = "http://api.openweathermap.org/data/2.5/weather" +
                    "?q=" + CityName + "," + txtCountryCode +
                    "&APPID=" + apiKey;
            } else if (document.getElementById('radioPostal').checked) {
                SearchString = "http://api.openweathermap.org/data/2.5/weather" +
                    "?zip=" + Postal + "," + CountryCodeTxt +
                    "&APPID=" + apiKey;
            } else if (document.getElementById('radioLatitude').checked) {
                SearchString = "http://api.openweathermap.org/data/2.5/weather" +
                    "?lat=" + Latitude1 + "&lon=" + Longtitude1 +
                    "&APPID=" + apiKey;
            }

            xhttp.open("GET", SearchString, true); //(3) open connection to a url
            xhttp.send(); //(4) sending the object to the webserver.

        }

    )

    function weatherTable(weather) {
        weather.id = $.now();
        var row = $('<tr>');
        var html = '<td>' + weather.name + '</td>' +
            '<td>' + weather.sys.country + '</td>' +
            '<td>' + weather.coord.lon + '</td>' +
            '<td>' + weather.coord.lat + '</td>' +
            '<td>' + weather.weather[0].description + '</td>' +
            '<td>' + (weather.main.temp - 273.15).toFixed(2) + '</td>' +
            '<td>' + weather.main.pressure + '</td>' +
            '<td>' + weather.main.humidity + '</td>' +
            '<td>' + weather.wind.speed + '</td>' +
            '<td>' + weather.wind.deg + '</td>' +
            '<td>' + new Date(weather.sys.sunrise * 1000).toLocaleTimeString() + '</td>' +
            '<td>' + new Date(weather.sys.sunset * 1000).toLocaleTimeString() + '</td>' +
            '<td><a class="delete" href="#">DELETE</a></td>';
        row.data().weatherID = weather.id;
        row.append(html);
        //save in the the browser's Local Storage
        saveLocalStorage(weather);

        $(mainElement).find('table#searchLog tbody').append(row);
        $(mainElement).find('#search :input').val('');

    }

    function saveLocalStorage(weather) {
        var currentWeather = localStorage.getItem('weather');
        var storage = [];
        if (currentWeather) {
            storage = JSON.parse(currentWeather);
        }
        storage.push(weather);
        localStorage.setItem('weather', JSON.stringify(storage));
    }

})