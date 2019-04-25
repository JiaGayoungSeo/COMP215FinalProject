$(document).ready(function () {

    $("#City").show();
    $("#PostalCode").hide();
    $("#Latitude").hide();
    $("input[type ='radio']").click(
        function (evt) {
            var searchButton = evt.target;

            if ($(searchButton).val() == '1') {
                $("#City").show();
                $("#PostalCode").hide();
                $("#Latitude").hide();

            }

            if ($(searchButton).val() == '2') {
                $("#PostalCode").show();
                $("#City").hide();
                $("#Latitude").hide();

            }

            if ($(searchButton).val() == '3') {
                $("#PostalCode").hide();
                $("#City").hide();
                $("#Latitude").show();
            }
        }
    )

    $("#SearchButton").click(
        function (event) {
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.responseText == 200) {
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


                    var resultHTML = "City: " + city_name + "<br />" +
                        "Country: " + country_name + "<br />" +
                        "Weather: " + weather_description + "<br />";

                    if ($('#checkLongitude').is(':checked')) {
                        resultHTML += "Longitude: " + longitude + "<br />";
                    }
                    if ($('#checkLatitude').is(':checked')) {
                        resultHTML += "Latitude: " + latitude + "<br />";
                    }
                    if ($('#checkTemperature').is(':checked')) {
                        resultHTML += "Temperature: " + temp + "<br />";
                    }
                    if ($('#checkPressure').is(':checked')) {
                        resultHTML += "Pressure: " + pressure + "<br />";
                    }
                    if ($('#checkHumidity').is(':checked')) {
                        resultHTML += "Humidity: " + humidity + "<br />";
                    }
                    if ($('#checkWindSpeed').is(':checked')) {
                        resultHTML += "WindSpeed: " + wind_speed + "<br />";
                    }
                    if ($('#checkWindDirection').is(':checked')) {
                        resultHTML += "Wind Direction: " + wind_direction + "<br />";
                    }
                    if ($('#checkSunrise').is(':checked')) {
                        resultHTML += "Sunrise: " + sunrise + "<br />";
                    }
                    if ($('#checkSunset').is(':checked')) {
                        resultHTML += "Sunset: " + sunset + "<br />";
                    }

                    $('#currentWeather').html(resultHTML);

                }
            }

            var CityName = $("#txtCityName").val();
            var CountryCode = $("#txtCountryCode").val();
            var Postal = $("#txtPostalCode").val();
            var CountryCodeTxt = $("#CountryCodetxt").val();
            var Latitude1 = $("#txtLatitude").val();
            var Longtitude1 = $("#txtLongtitude").val();


            if (document.getElementById('radioCity').checked) {
                var apiKey = "0ce883d431a40d2f3301142f74f3dd8e";
                SearchString = "http://api.openweathermap.org/data/2.5/weather" +
                    "?q=" + CityName + "," + CountryCode +
                    "&APPID=" + apiKey;
            } else if (document.getElementById('radioPostal').checked) {
                var apiKey = "0ce883d431a40d2f3301142f74f3dd8e";
                SearchString = "http://api.openweathermap.org/data/2.5/weather" +
                    "?zip=" + Postal + "," + CountryCodeTxt +
                    "&APPID=" + apiKey;
            } else if (document.getElementById('radioLatitude').checked) {
                var apiKey = "0ce883d431a40d2f3301142f74f3dd8e";
                SearchString = "http://api.openweathermap.org/data/2.5/weather" +
                    "?lat=" + Latitude1 + "&lon=" + Longtitude1 +
                    "&APPID=" + apiKey;
            }

            xhttp.open("GET", SearchString, true); 
            xhttp.send(); 
        
        }

    )



})
