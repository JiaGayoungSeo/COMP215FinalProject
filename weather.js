$(document).ready(function () {


    $("#City").show();
    $("#PostalCode").hide();
    $("#Latitude").hide();

    var mainElement = document.getElementById("weatherLog");

    loadData();

    //function to show appropriate input boxes when eahc search option is selected.
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

    //function to load and display data from local storage 
    function loadData() {
        var storedWeather = localStorage.getItem('weather');
        if (storedWeather) { //check if there are any data
            weatherArray = JSON.parse(storedWeather); //convert data into an array of objects
            $.each(weatherArray, function (index, weather) {
                var row = $('<tr>'); //create an empty row object
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

                row.append(html); //attach html of td's to blank row
                $(mainElement).find('table#searchLog tbody').append(row);
            });
        }
    }

    //variables from text boxes
    var countryCode = document.getElementById('txtCountryCode');
    var postalCode = document.getElementById('txtPostalCode');
    var country_Code = document.getElementById('CountryCodetxt');
    var latitude = document.getElementById('txtLatitude');
    var longitude = document.getElementById('txtLongtitude');


    countryCode.oninput = function (event) {
        countryCode.checkValidity(); // check valid state, and force raise oninvalid if needed
    }

    postalCode.oninput = function (event) {
        postalCode.checkValidity(); // check valid state, and force raise oninvalid if needed
    }

    country_Code.oninput = function (event) {
        country_Code.checkValidity(); // check valid state, and force raise oninvalid if needed
    }

    latitude.oninput = function (event) {
        latitude.checkValidity(); // check valid state, and force raise oninvalid if needed
    }
    longitude.oninput = function (event) {
        longitude.checkValidity(); // check valid state, and force raise oninvalid if needed
    }

    countryCode.oninvalid = checkInput; // assigning event handler by using a named function defined elsewhere in your code
    country_Code.oninvalid = checkInput; // assigning event handler by using a named function defined elsewhere in your code
    postalCode.oninvalid = checkInput; // assigning event handler by using a named function defined elsewhere in your code
    latitude.oninvalid = checkInput; // assigning event handler by using a named function defined elsewhere in your code
    longitude.oninvalid = checkInput; // assigning event handler by using a named function defined elsewhere in your code

    function checkInput(event) {
        InputBox = event.target;//global variable

        //if any validation constraint fails
        if (!InputBox.validity.valid) {

            if (InputBox == countryCode) {
                InputBox.setCustomValidity(""); //clear out the validity message
                if (InputBox.validity.valueMissing) {
                    InputBox.setCustomValidity("Custom message: Value is missing");
                }
                if (InputBox.value.length < 2) {
                    InputBox.setCustomValidity("Custom message: Country code should be 2 characters");
                }

            }
            if (InputBox == country_Code) {
                InputBox.setCustomValidity(""); //clear out the validity message
                if (InputBox.validity.valueMissing) {
                    InputBox.setCustomValidity("Custom message: Value is missing");
                }
                if (InputBox.value.length < 2) {
                    InputBox.setCustomValidity("Custom message: Country code should be 2 characters");
                }

            }
            if (InputBox == postalCode) {
                InputBox.setCustomValidity(""); //clear out the validity message
                if (InputBox.validity.valueMissing) {
                    InputBox.setCustomValidity("Custom message: Value is missing");
                }
                if (InputBox.validity.patternMismatch) {
                    InputBox.setCustomValidity("Custom message: Follow the provided format");
                }
            }
            if (InputBox == latitude) {
                InputBox.setCustomValidity(""); //clear out the validity message
                if (InputBox.validity.valueMissing) {
                    InputBox.setCustomValidity("Custom message: Please type latitude");
                }

                if (InputBox.validity.typeMismatch) {
                    InputBox.setCustomValidity("Custom message: Value is not a number(Should enter number)");
                }
            }

            if (InputBox == longitude) {
                InputBox.setCustomValidity(""); //clear out the validity message
                if (InputBox.validity.valueMissing) {
                    InputBox.setCustomValidity("Custom message: Please type longitude");
                }
                if (InputBox.validity.typeMismatch) {
                    InputBox.setCustomValidity("Custom message: Value is not a number(Should enter number)");
                }
            }
        }
    }

    $("#SearchButton").click(

        //function to search weather information
        function (evt) {

            var xhttp = new XMLHttpRequest(); //create an XMLHttpRequest object

            //implement an event handler that is called when the XMLHttpRequest object has received a reponse(or an error)
            xhttp.onreadystatechange = function () {
                //call back function: process response from the server
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
                    var sunrise = new Date(obj["sys"]["sunrise"] * 1000).toLocaleTimeString();//to get current local time and output the time
                    var sunset = new Date(obj["sys"]["sunset"] * 1000).toLocaleTimeString();//to get current local time and output the time 

                    var convertedTemp = temp.toFixed(2);

                    var SearchResultsHTML = "City: " + city_name + "<br />" +
                        "Country: " + country_name + "<br />" +
                        "Weather: " + weather_description + "<br />";

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


                    weatherTable(obj);

                };
            }

            //compose and send request
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

            xhttp.open("GET", SearchString, true); //open connection to a url
            xhttp.send(); //sending request

        }

    )

    //function to create table
    function weatherTable(weather) {
        weather.id = $.now();//use clock as a unique key
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
        row.append(html);//
        //save in the the browser's Local Storage
        saveLocalStorage(weather);

        $(mainElement).find('table#searchLog tbody').append(row);
        $(mainElement).find('#search :input').val('');

    }

    function saveLocalStorage(weather) {
        //get string data from the whole array from storage
        var currentWeather = localStorage.getItem('weather');
        var storage = []; //create empty array
        if (currentWeather) {//if there are any data in storage
            storage = JSON.parse(currentWeather); // load contacts array with that data
        }
        storage.push(weather); // add new contact to end of array
        //overwriting any existing 'weather' key with new stringified array
        localStorage.setItem('weather', JSON.stringify(storage));
    }

    //function to delete all data from displayed table and local storage when "Clear log" is clicked
    $(mainElement).find("a.deleteAll").click(
        function (evt) {
            evt.preventDefault();
            localStorage.clear();
            $(mainElement).find('table#searchLog tbody').empty();
        }
    );

    //delete weather data when "Delete" button clicked
    $(mainElement).on("click", "a.delete",
        function (evt) {
            evt.preventDefault();
            deleteWeather(evt);
        }
    );

    //function to delete weather
    function deleteWeather(event) {
        //get the ID from the parent row of the selected link
        var weatherID = $(event.target).parents('tr').data().weatherID;
        //get the string data from the whole array from local storage
        var weather = JSON.parse(localStorage.getItem('weather'));
        //to filter out the weather with required ID to delete
        var currentWeather = weather.filter(function (newWeather) {
            return newWeather.id != weatherID;
        });

        //overwrite storage with new array
        localStorage.setItem('weather', JSON.stringify(currentWeather));
        //remove the parent row of the selected link
        $(event.target).parents('tr').remove();

    }


});


