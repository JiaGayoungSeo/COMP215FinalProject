$(document).ready(function(){
    var mainElement = document.getElementById("weatherLog");

    $(mainElement).find("a.deleteAll").click(
        function (evt) {
            evt.preventDefault();
            localStorage.clear();
            $(mainElement).find('table#searchLog tbody').empty();
        }
    );

    //delete weather data
    $(mainElement).on("click", "a.delete",
        function (evt) {
            evt.preventDefault();
            deleteWeather(evt);
        }
    );

    //function to delete weather
    function deleteWeather(event) {
        var weatherID = $(event.target).parents('tr').data().weatherID;
        var weather = JSON.parse(localStorage.getItem('weather'));
        var currentWeather = weather.filter(function (newWeather) {
            return newWeather.id != weatherID;
        });
        localStorage.setItem('weather', JSON.stringify(currentWeather));
        $(event.target).parents('tr').remove();

    }

})