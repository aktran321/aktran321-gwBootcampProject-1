const firebaseConfig = {
    apiKey: "AIzaSyDORWg5o64fPN4R0Cnt1DlwC_8dWfEhI4U",
    authDomain: "flights-and-fahrenheit.firebaseapp.com",
    databaseURL: "https://flights-and-fahrenheit.firebaseio.com",
    projectId: "flights-and-fahrenheit",
    storageBucket: "flights-and-fahrenheit.appspot.com",
    messagingSenderId: "15407877860",
    appId: "1:15407877860:web:a9fe39f08a0be2871426f1"
  };

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var flight = database.ref("/flights");

// --------------------------------------------------------------
// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
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

// database.ref().on("value", function(snapshot) {
//   // If Firebase has a highPrice and highBidder stored (first case)
//   // Set the variables for highBidder/highPrice equal to the stored values in firebase.
//   // Change the HTML to reflect the stored values
//     for(var key in snapshot.val().flights){
//       var trRow = $("<tr>");
//       console.log(key);
//       console.log(snapshot.val().flights[key].flightNumber);

//       var thFlightNumber = $("<td>");
//       var thDeparture = $("<td>");
//       var thDestination = $("<td>");
//       var thFlightDate = $("<td>");
//       var thFlightDepartureTime = $("<td>");

//       thFlightNumber.text(snapshot.val().flights[key].flightNumber);
//       thDeparture.text(snapshot.val().flights[key].departure);
//       thDestination.text(snapshot.val().flights[key].destination);
//       thFlightDate.text(snapshot.val().flights[key].dateFlight);
//       thFlightDepartureTime.text(snapshot.val().flights[key].frequency);
      

//       trRow.append(thFlightNumber);
//       trRow.append(thDeparture);
//       trRow.append(thDestination);
//       trRow.append(thFlightDate);
//       trRow.append(thFlightDepartureTime);

//       $(".flight-schedule").append(trRow);
 
//     } 
// // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
// //If any errors are experienced, log them to console.
// }, function(errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });

// Whenever a user clicks the submit-bid button
$("#submit-flight").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  var flightNumber = $("#flight-number").val().trim();
  var destination = $("#destination").val().trim();
  var flightDate = $("#date").val().trim();
  var userID = "me";
  
  writeNewFlightSchedule(flightNumber,destination,flightDate,userID);

});

// Write a scheduling to the train table
function writeNewFlightSchedule(flightNumberInput,destinationInput,flightDateInput,userID) {
  // Form the object that will be saved to DB
  var scheduleData = {
    flightNumber: flightNumberInput,
    destination: destinationInput,
    flightDate: flightDateInput,
    user: userID};

  // Get a key uniquely identify the object that will be saved to DB
  flight.push(scheduleData);
}