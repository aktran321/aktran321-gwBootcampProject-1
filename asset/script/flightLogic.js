var currentUser = sessionStorage.getItem("user-name");
var firstName = sessionStorage.getItem("first-name");

console.log(currentUser);

const firebaseConfig = {
    apiKey: "AIzaSyDORWg5o64fPN4R0Cnt1DlwC_8dWfEhI4U",
    authDomain: "flights-and-fahrenheit.firebaseapp.com",
    databaseURL: "https://flights-and-fahrenheit.firebaseio.com",
    projectId: "flights-and-fahrenheit",
    storageBucket: "flights-and-fahrenheit.appspot.com",
    messagingSenderId: "15407877860",
    appId: "1:15407877860:web:a9fe39f08a0be2871426f1"};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var flight = database.ref("/flights");
// var flightAPI = database.ref("/flightsRecord")

// --------------------------------------------------------------
// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
async function FlightStatusAPI(flightNumber){
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
        var flightNumber = $("#flight-number").val().trim();
        var destination = $("#destination").val().trim();
        var flightDate = $("#date").val().trim();
  
        console.log('response',response);
        console.log(response[0].arrival.airport.location.lon);
        console.log(response[0].arrival.airport.location.lat);
        console.log(response[0].arrival.airport.shortName);
        console.log(response[0].arrival.scheduledTimeLocal);
        console.log(response[0].aircraft.image.url);
        console.log(response[0].aircraft.model);

        writeNewFlightSchedule(flightNumber,destination,flightDate,currentUser);

    }).fail(function(error){
      console.log(error);
    });
}

// Whenever a user clicks the submit-bid button
$("#submit-flight").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  var flightNumber = $("#flight-number").val().trim();
  var destination = $("#destination").val().trim();
  var flightDate = $("#date").val().trim();
  
  if((currentUser !== null)){
    FlightStatusAPI(flightNumber);
  }
   
});

// Write a scheduling to the train table
function writeNewFlightSchedule(flightNumberInput,destinationInput,flightDateInput,userID) {
  
  // Form the object that will be saved to DB
  var scheduleData = {
    flightNumber: flightNumberInput,
    destination: destinationInput,
    flightDate: flightDateInput};

  // Get a key uniquely identify the object that will be saved to DB
  flight.child(userID).set(scheduleData);

}