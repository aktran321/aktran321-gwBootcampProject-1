$(document).ready(function(){

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
    var users = database.ref("/users");

    function checkPasswordCorrect(){
        var key = $("#user-name").val().trim();

        return users.once('value').then(function(snapshot) {
            console.log(snapshot.val()[key].password);
            });
    }

    // function passwordValid(a,b){
    //     if(a===b)
    //         return true;
    //     else 
    //         return false;
    // };

    // function writeUserToDB(u,k){
    //     var key = k;
    //     var user = u;
    //     //custom object
    //     flight.child(key).set(user);
    // };
    
    // //flight-number

    // function handleSignUp(){
        
    //     console.log("I am here !");

    //     var userNameInput = $("#user-name").val().trim();
    //     var firstNameInput = $("#first-name").val().trim();
    //     var lastNameInput = $("#last-name").val().trim();
    //     var passwordInput = $("#password").val().trim();
    //     var passwordCheckInput = $("#password-check").val().trim();

    //     if(passwordValid(passwordInput,passwordCheckInput)){
    //         // checkExistance(userName);

    //         if(false)
    //             alert("Sorry ! Username already exists !");
    //         else{
    //             key = userNameInput;

    //             var user = {
    //              firstName: firstNameInput,
    //              lastName: lastNameInput,
    //              password: passwordInput}
                 
                 
    //             console.log("I am user-name " + key);
    //             console.log("I am object ");
    //             console.log(user);
                
    //             writeUserToDB(user,key);
    //         }

    //     }
    // }

    $("#user-login").on("click", function(){
        event.preventDefault();
        checkPasswordCorrect(); 
    });

});