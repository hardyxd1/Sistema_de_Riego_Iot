 $('.toggle').click(function() {
     $('.formulario').animate({
         height: "toggle",
         'paddin-top': 'toggle',
         'padding-bottom': 'toggle',
         opacity: 'toggle'
     }, 'slow');
 });
 var config = {
     apiKey: "AIzaSyDwLLnVJ68jtyuw2TeLsd5vkdmUN85xzrc",
     authDomain: "sistema-de-riego-52d38.firebaseapp.com",
     databaseURL: "https://sistema-de-riego-52d38.firebaseio.com",
     projectId: "sistema-de-riego-52d38",
     storageBucket: "sistema-de-riego-52d38.appspot.com",
     messagingSenderId: "1078905293995"
 };
 // obtener los datos de firebase
 // firebase.initializeApp(config);

 (function($) {

     // Breakpoints.
     skel.breakpoints({
         xlarge: "(max-width: 1680px)",
         large: "(max-width: 1280px)",
         medium: "(max-width: 980px)",
         small: "(max-width: 736px)",
         xsmall: "(max-width: 480px)"
     });

     $(function() {

         var $window = $(window),
             $body = $('body');

         // Disable animations/transitions until the page has loaded.
         $body.addClass('is-loading');

         $window.on('load', function() {
             window.setTimeout(function() {
                 $body.removeClass('is-loading');
             }, 100);
         });

         // Prioritize "important" elements on medium.
         skel.on('+medium -medium', function() {
             $.prioritize(
                 '.important\\28 medium\\29',
                 skel.breakpoint('medium').active
             );
         });

         // Off-Canvas Navigation.

         // Navigation Panel.
         $(
                 '<div id="navPanel">' +
                 $('#nav').html() +
                 '<a href="#navPanel" class="close"></a>' +
                 '</div>'
             )
             .appendTo($body)
             .panel({
                 delay: 500,
                 hideOnClick: true,
                 hideOnSwipe: true,
                 resetScroll: true,
                 resetForms: true,
                 side: 'left'
             });

         // Fix: Remove transitions on WP<10 (poor/buggy performance).
         if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
             $('#navPanel')
             .css('transition', 'none');

     });

 })(jQuery);




 // SENSORES!!
 firebase.initializeApp(config);

 // Sensror de la humedad del hambiente
 var dh = firebase.database().ref().child("/Humedad");

 dh.on("value", function(snapshot) {

     console.log("Humidity:", snapshot.val());
     var temperatura = snapshot.val();
     document.getElementById("Humedad").innerHTML = temperatura + "%RH";

 });
 // Sensorede la huemedad de la planta
 var dp = firebase.database().ref().child("/Plant moisturef");
 dp.on("value", function(snapshot) {

     console.log("Plant moisturef:", snapshot.val());
     document.getElementById("HumedadP").innerHTML = snapshot.val() + "%RH";
 });
 //sensror de la temperatura
 var dt = firebase.database().ref("/Temperatura");
 dt.on("value", function(snapshot) {

     console.log("Temperature:", snapshot.val());
     document.getElementById("Temperatura").innerHTML = snapshot.val() + "℃";

 });