$(document).ready(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyDORWg5o64fPN4R0Cnt1DlwC_8dWfEhI4U",
        authDomain: "flights-and-fahrenheit.firebaseapp.com",
        databaseURL: "https://flights-and-fahrenheit.firebaseio.com",
        projectId: "flights-and-fahrenheit",
        storageBucket: "flights-and-fahrenheit.appspot.com",
        messagingSenderId: "15407877860",
        appId: "1:15407877860:web:a9fe39f08a0be2871426f1"
    };
    firebase.initializeApp(firebaseConfig);
    var flightArrivalLon = 0;
    var flightArrivalLat = 0;
    var userDate = "";
    var localWeather = "";

    $("#add-flight").on("click", function () {
        event.preventDefault();
        var query = $("#flight-input").val().trim();
        var airSettings = {
            "async": false,
            "crossDomain": true,
            "url": "https://aerodatabox.p.rapidapi.com/flights/" + query,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
                "x-rapidapi-key": "91517b45bamsh422e95c783d3857p157a15jsne3d2bb772529"
            }
        }
        $.ajax(airSettings).done(function (response) {
            var arrival = response;
            flightArrivalLat = arrival[0].arrival.airport.location.lat;
            flightArrivalLon = arrival[0].arrival.airport.location.lon;
        });
        console.log("The folowing is arrival Lattitude")
        console.log(flightArrivalLat);
        console.log("The folowing is arrival Longtitude")
        console.log(flightArrivalLon);
        weatherAndTime();
        //Call AJAX for weather and spit out relevant results
        function weatherAndTime() {
            convertUserDate();
            var weatherSettings = {
                "async": true,
                "crossDomain": true,
                "url": "https://weather2020-weather-v1.p.rapidapi.com/e8ecee8ff60c478f8a36280fea0524fe/" + flightArrivalLat + "," + flightArrivalLon,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "weather2020-weather-v1.p.rapidapi.com",
                    "x-rapidapi-key": "91517b45bamsh422e95c783d3857p157a15jsne3d2bb772529"
                }
            }
            $.ajax(weatherSettings).done(function (resp) {
                console.log(resp);
                localWeather = resp;
                for (i = 0; i <= 11; i++) {
                    var firstWeek = localWeather[i].startDate;
                    var secondWeek = localWeather[i + 1].startDate;
                    if ((firstWeek < userCompSeconds) && (userCompSeconds < secondWeek)) {
                        console.log(localWeather[i].headline);
                        console.log(localWeather[i].conditions[0].display);
                        console.log(localWeather[i].forecastDesc);
                        console.log(localWeather[i].temperatureHigh + "F");
                        console.log(localWeather[i].temperatureLow + "F");
                    }
                }
            });
        }
        function convertUserDate() {
            userDate = $("#date-input").val().trim();
            var dateString = userDate;
            var momentObj = moment(dateString, 'MM-DD-YYYY');
            userCompSeconds = momentObj.valueOf();
            userCompSeconds = userCompSeconds / 1000;
        }
    });
});