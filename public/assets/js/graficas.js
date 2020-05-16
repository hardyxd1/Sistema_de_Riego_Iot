var config = {
    apiKey: "AIzaSyDwLLnVJ68jtyuw2TeLsd5vkdmUN85xzrc",
    authDomain: "sistema-de-riego-52d38.firebaseapp.com",
    databaseURL: "https://sistema-de-riego-52d38.firebaseio.com",
    projectId: "sistema-de-riego-52d38",
    storageBucket: "sistema-de-riego-52d38.appspot.com",
    messagingSenderId: "1078905293995"
};
firebase.initializeApp(config);

/*

!!MOTOR

*/
$(document).ready(function() {
    var database = firebase.database();
    var motorStatus;
    database.ref().on("value", function(snapshot) {
        motorStatus = snapshot.val().motorStatus;
        if (motorStatus == 1) {
            $(".mStatus").text("El motor esta encendido");

        } else {
            $(".mStatus").text("El motor esta apagado");
        }
    });
    $(".motorButton").click(function() {
        var firebaseref = firebase.database().ref().child("/Motor");
        if (motorStatus == 1) {
            firebaseref.set(0);
            motorStatus = 0;
        } else {
            firebaseref.set(1);
            motorStatus = 1;
        }
    });
});