
var cityName = document.getElementById('txtCityName');
var countryCode = document.getElementById('txtCountryCode');
var postalCode = document.getElementById('txtPostalCode');
var country_Code = document.getElementById('CountryCodetxt');
var latitude = document.getElementById('txtLatitude');
var longitude = document.getElementById('txtLontitude');

cityName.oninput = function(event){
    cityName.checkValidity();
}
countryCode.oninput = function(event){
    countryCode.checkValidity();
}

postalCode.oninput = function(event){
    postalCode.checkValidity();
}

country_Code.oninput = function(event){
    country_Code.checkValidity();
}

latitude.oninput = function(event){
    latitude.checkValidity();
}
longitude.oninput = function(event){
    longitude.checkValidity();
}

cityName.oninvalid = checkInput; 
countryCode.oninvalid = checkInput;
country_Code.oninvalid = checkInput; 
postalCode.oninvalid = checkInput;
latitude.oninvalid = checkInput;
longitude.oninvalid = checkInput;

function checkInput(event){
    InputBox = event.target;
    InputBox.setCustomValidity("");

    if (!InputBox.validity.valid) {
        // if any validation constraint fails

        if (InputBox.validity.rangeOverflow) {
            InputBox.setCustomValidity("Custom Message: Value too large"); 
        }
        if (InputBox.validity.rangeUnderflow) {
            InputBox.setCustomValidity("Custom Message: Value too small");
        }
        if (InputBox.validity.valueMissing) {
            InputBox.setCustomValidity("Custom Message: Value is missing");
        }
        if (InputBox.validity.typeMismatch) {
            InputBox.setCustomValidity("Custom Message: Value is not a number (type mismatch)");
        }
    }
}