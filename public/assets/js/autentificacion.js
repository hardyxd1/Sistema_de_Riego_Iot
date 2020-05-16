function login() {
    var userEmail = document.getElementById("email1_field").value;
    var userPass = document.getElementById("password1_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
        .then(function(result) {
            window.location.href = "indexS.html";
        })

    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("ERROR :" + errorMessage);
        // ...
    });
}

function registrar() {
    var userEmail = document.getElementById("emailR_field").value;
    var userPass = document.getElementById("passwordR_field").value;
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
        .then(function() {
            //verificar()
            window.alert("Cuenta creada!");
            location.reload();
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

}

function observador() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log("existe usuario activo")
            console.log(user)
                //  mostrar (user)
                //  console.log ("**********");
                //  console.log (user.emailVerified);
                //  console.log ("**********");

            //  var emailVerified = user.emailVerified;
        } else {
            // No user is signed in.
            console.log("no existe usuario activo")
        }
    });
}
observador();


function recoveryPass() {
    firebase.auth().sendPasswordResetEmail("email")
        .then(function() {
            window.alert("Revisa tu correo!");
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        })

}

$(document).ready(function() {
    var database = firebase.database();
    var motorStatus;
    database.ref().on("value", function(snapshot) {
        motorStatus = snapshot.val().motorStatus;
        if (motorStatus == 0) {
            $(".mStatus").text("El motor esta encendido");

        } else {
            $(".mStatus").text("El motor esta apagado");
        }
    });
    $(".motorButton").click(function() {
        var firebaseref = firebase.database().ref().child("/Motor");
        if (motorStatus == 0) {
            firebaseref.set(1);
            motorStatus = 1;
        } else {
            firebaseref.set(0);
            motorStatus = 0;
        }
    });
});










/*function mostrar (user){
  var user = user;
  if(user.emailVerified){
      window.location.href = "pagina.html";
  }
}

/*function verificar (){
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      // Email sent.
      console.log ("enviando correo...");
    }).catch(function(error) {
      // An error happened.
      console.log (error);
    });
}*/