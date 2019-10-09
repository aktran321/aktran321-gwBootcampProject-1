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
    //firebase.initializeApp(firebaseConfig);
    var flightArrivalLon = 0;
    var flightArrivalLat = 0;
    var userDate = "";
    var localWeather = "";

    $("#submit-flight").on("click", function () {

        event.preventDefault();
        var query = $("#flight-number").val().trim();
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
        console.log("The folowing is arrival Lattitude");
        console.log(flightArrivalLat);
        console.log("The folowing is arrival Longtitude");
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
                for (i = 0; i < 11; i++) {
                    var firstWeek = localWeather[i].startDate;
                    var secondWeek = localWeather[i + 1].startDate;
                    // console.log("I am first week: " + firstWeek);
                    // console.log("I am second week: "+ secondWeek);
                    // console.log("Usercompseconds: "+ userCompSeconds);
                    if ((firstWeek < userCompSeconds) && (userCompSeconds < secondWeek)) {
                       console.log(localWeather[i].regionAffected);
                        console.log("Headline: "+localWeather[i].headline);
                        console.log("Conditinon: "+localWeather[i].conditions[0].display);
                        console.log("Forecast Description: "+localWeather[i].forecastDesc);
                        console.log("High Temp: "+localWeather[i].temperatureHigh + "F");
                        console.log("Low Temp: "+localWeather[i].temperatureLow + "F");
                        
                        
                        $("#region").text("Region: "+(localWeather[i].regionAffected));
                        $("#headline").text("Headline: " +localWeather[i].headline);
                        //console.log("condition is : "+ (localWeather[i].conditions[0].display));
                        $("#forecast").text("Forecast: "+(localWeather[i].forecastDesc));
                        $("#high-temp").text("High Temperature: "+ (localWeather[i].temperatureHigh + "F"));
                        $("#low-temp").text("Low Temperature: "+ (localWeather[i].temperatureLow + "F"));

                        var condition = localWeather[i].conditions[0].display;
                        if((condition)=="Overcast"){
                            $("#image-weather").append("<img id='weather-image' src='images/sun-and-cloud.png'/> ")
                        } else if (condition == "Snow"){
                            $("#image-weather").append("<img id='weather-image' src='images/snowflake.png'/> ")
                        } else if (condition == "Thunderstorm"){
                            $("#image-weather").append("<img id='weather-image' src='images/thunder-cloud.png'/> ")
                        } else if (condition == "Rain" || condition =="Rainy") {
                            $("#image-weather").append("<img id='weather-image' src='images/rain-cloud.png'/> ")
                        } else if (condition == "Mostly Cloudy" || condition == "Cloudy"){
                            $("#image-weather").append("<img id='weather-image' src='images/cloudy.png'/> ")
                        }else{
                            $("#image-weather").append("<img id='weather-image' src='images/sun.png'/> ")
                        }
                    }
                }
            });
        }
        function convertUserDate() {
            
            userDate = $("#date").val().trim();
            console.log("This is userDate: "+ userDate);
            var dateString = userDate;
            var momentObj = moment(dateString, 'YYYY-MM-DD');
            userCompSeconds = momentObj.valueOf();
            userCompSeconds = userCompSeconds / 1000;
        }
    });
});