 var temp = [],
     hum = [],
     humP = [];
 var firebase = new Firebase("https://sistema-de-riego-52d38.firebaseio.com/");
 firebase.on('value', function(snapshot) {
     for (let i in snapshot.val().temp) {
         temp.push(snapshot.val().temp[i]);
     }
     for (let i in snapshot.val().hum) {
         hum.push(snapshot.val().hum[i]);
     }
     for (let i in snapshot.val().humP) {
         humP.push(snapshot.val().humP[i]);
     }

     temp = temp.slice(temp.length - 30, temp.length);
     hum = hum.slice(hum.length - 30, hum.length);
     humP = humP.slice(humP.length - 30, humP.length);

     drawGraph(temp, hum, humP);
 });

 function drawGraph(temp, hum, humP, motion) {
     var labels = ["2018-11-14  ", "2018-11-14",
         "2018-11-14", "2018-11-14",
         "2018-11-14", "2018-11-14",
         "2018-11-14", "2018-11-14",
         "2018-11-14", "2018-11-14",
         "2018-11-14", "2018-11-14",
         "2018-11-14", "2018-11-14",
         "2018-11-14", "2018-11-14",
         "2018-11-14"
     ];
     var ctx = document.getElementById("myChart").getContext('2d');
     var myChart = new Chart(ctx, {
         type: 'line',
         data: {
             labels: labels,
             datasets: [{
                     label: "temperature [°C]",
                     labelString: "°C",
                     borderColor: 'rgb(255, 99, 132)',
                     backgroundColor: 'rgb(255, 99, 132)',
                     fill: false,
                     data: temp,
                     yAxisID: "y-axis-temp",
                 },
                 {
                     label: "humidity [%RH]",
                     labelString: "hum",

                     borderColor: 'rgb(0, 99, 132)',
                     backgroundColor: 'rgb(0, 99, 132)',
                     fill: false,
                     data: hum,
                     yAxisID: "y-axis-temp",

                 },
                 {
                     label: "humidityP [%]",
                     labelString: "humP",

                     borderColor: 'rgb(145, 70, 65)',
                     backgroundColor: 'rgb(145, 70, 65)',
                     fill: false,
                     data: humP,
                     yAxisID: "y-axis-temp",

                 },
                 {
                     label: "motion [0-1]",
                     labelString: "motion",

                     borderColor: 'rgb(0, 21, 32)',
                     backgroundColor: 'rgb(0, 21, 32)',
                     fill: false,
                     data: motion,
                     yAxisID: "y-axis-temp",

                 }
             ]
         },
         options: {
             responsive: true,
             maintainAspectRatio: false,
             hoverMode: 'index',
             stacked: false,
             title: {
                 display: true,
                 text: 'Sensores'
             },

             scales: {
                 yAxes: [{
                     type: "linear",
                     display: true,
                     position: "left",
                     id: "y-axis-temp",
                     ticks: {
                         beginAtZero: true,
                         suggestedMax: 50
                     }

                 }],
             }

         }
     });
 }