$(document).ready(function(){
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

})