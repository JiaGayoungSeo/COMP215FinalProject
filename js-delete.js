$(document).ready(function(){
    var mainElement = document.getElementById("weatherLog");

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

})