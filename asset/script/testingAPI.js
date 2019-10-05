
function FlightStatusAPI(flightNumber){
    event.preventDefault();
    console.log("I am here at flight API");
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://aerodatabox.p.rapidapi.com/flights/" + flightNumber + "?withAircraftImage=true",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
            "x-rapidapi-key": "91517b45bamsh422e95c783d3857p157a15jsne3d2bb772529"
        }
    }
    
    $.ajax(settings).done(function(response) {
        console.log(response);
    });
    
}

$(document).on("click", "#submit-flight", FlightStatusAPI);