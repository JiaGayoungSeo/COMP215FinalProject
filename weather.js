$(document).ready(function () {


    $("#City").show();
    $("#PostalCode").hide();
    $("#Latitude").hide();

    var mainElement = document.getElementById("weatherLog");

    loadData();

    function loadData() {
        var storedWeather = localStorage.getItem('weather'); //key to Local storage
        if (storedWeather) { // check if we have any data in storedWeather.
            weatherArray = JSON.parse(storedWeather); // convert data into an array of objects
            $.each(weatherArray, function (index, weather) {
                var row = $('<tr>'); // create an empty row object
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

                row.append(html); // attach html of td's to blank row
                $(mainElement).find('table#searchLog tbody').append(row);
            });
        }
    }
    
});




