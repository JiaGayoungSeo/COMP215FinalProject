//variables from text boxes
var countryCode = document.getElementById('txtCountryCode');
var postalCode = document.getElementById('txtPostalCode');
var country_Code = document.getElementById('CountryCodetxt');
var latitude = document.getElementById('txtLatitude');
var longitude = document.getElementById('txtLongtitude');


countryCode.oninput = function(event){
    countryCode.checkValidity(); // check valid state, and force raise oninvalid if needed
}

postalCode.oninput = function(event){
    postalCode.checkValidity(); // check valid state, and force raise oninvalid if needed
}

country_Code.oninput = function(event){
    country_Code.checkValidity(); // check valid state, and force raise oninvalid if needed
}

latitude.oninput = function(event){
    latitude.checkValidity(); // check valid state, and force raise oninvalid if needed
}
longitude.oninput = function(event){
    longitude.checkValidity(); // check valid state, and force raise oninvalid if needed
}

countryCode.oninvalid = checkInput; // assigning event handler by using a named function defined elsewhere in your code
country_Code.oninvalid = checkInput; // assigning event handler by using a named function defined elsewhere in your code
postalCode.oninvalid = checkInput; // assigning event handler by using a named function defined elsewhere in your code
latitude.oninvalid = checkInput; // assigning event handler by using a named function defined elsewhere in your code
longitude.oninvalid = checkInput; // assigning event handler by using a named function defined elsewhere in your code

function checkInput(event){
    InputBox = event.target;//global variable

    //if any validation constraint fails
    if (!InputBox.validity.valid) {
        
        if(InputBox == countryCode){
            InputBox.setCustomValidity(""); //clear out the validity message
            if(InputBox.validity.valueMissing){
                InputBox.setCustomValidity("Custom message: Value is missing");
            }
            if(InputBox.value.length<2){
                InputBox.setCustomValidity("Custom message: Country code should be 2 characters");
            }
    
        }
        if(InputBox == country_Code){
            InputBox.setCustomValidity(""); //clear out the validity message
            if(InputBox.validity.valueMissing){
                InputBox.setCustomValidity("Custom message: Value is missing");
            }
            if(InputBox.value.length<2){
                InputBox.setCustomValidity("Custom message: Country code should be 2 characters");
            }
        
        }
        if(InputBox==postalCode){
            InputBox.setCustomValidity(""); //clear out the validity message
            if(InputBox.validity.valueMissing){
                InputBox.setCustomValidity("Custom message: Value is missing");
            }
            if(InputBox.validity.patternMismatch){
                InputBox.setCustomValidity("Custom message: Follow the provided format");
            }
        }
        if(InputBox==latitude){
            InputBox.setCustomValidity(""); //clear out the validity message
            if(InputBox.validity.valueMissing){
                InputBox.setCustomValidity("Custom message: Please type latitude");
            }

            if(InputBox.validity.typeMismatch){
                InputBox.setCustomValidity("Custom message: Value is not a number(Should enter number)");
            }
        }

        if(InputBox==longitude){
            InputBox.setCustomValidity(""); //clear out the validity message
            if(InputBox.validity.valueMissing){
                InputBox.setCustomValidity("Custom message: Please type longitude");
            }
            if(InputBox.validity.typeMismatch){
                InputBox.setCustomValidity("Custom message: Value is not a number(Should enter number)");
            }
        }
    }
}