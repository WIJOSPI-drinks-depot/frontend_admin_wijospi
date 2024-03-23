// Partie Statistique

// var options = {
//     series: [{
//     name: 'Nombre de ventes ',
//     data: [20, 10, 15, 8, 7, 20, 6, 25, 30, 18, 15, 100]
//   }],
//     chart: {
//     height: 350,
//     type: 'bar',
//   },
//   plotOptions: {
//     bar: {
//       borderRadius: 10,
//       dataLabels: {
//         position: 'top', // top, center, bottom
//       },
//     }
//   },
//   dataLabels: {
//     enabled: true,
//     formatter: function (val) {
//       return val + "";
//     },
//     offsetY: -20,
//     style: {
//       fontSize: '15px',
//       colors: ["#304758"]
//     }
//   },
  
//   xaxis: {
//     categories: ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Aôut", "Sept", "Oct", "Nov", "Dec"],
//     position: 'top',
//     axisBorder: {
//       show: false
//     },
//     axisTicks: {
//       show: false
//     },
//     crosshairs: {
//       fill: {
//         type: 'gradient',
//         gradient: {
//           colorFrom: '#D8E3F0',
//           colorTo: '#BED1E6',
//           stops: [0, 100],
//           opacityFrom: 0.4,
//           opacityTo: 0.5,
//         }
//       }
//     },
//     tooltip: {
//       enabled: true,
//     }
//   },
//   yaxis: {
//     axisBorder: {
//       show: false
//     },
//     axisTicks: {
//       show: false,
//     },
//     labels: {
//       show: false,
//       formatter: function (val) {
//         return val + "";
//       }
//     }
  
//   },
//   title: {
//     text: 'Statistique des ventes à ETS GLORY-WIJOSPI, 2023',
//     floating: true,
//     offsetY: 330,
//     align: 'center',
//     style: {
//       color: '#444'
//     }
//   }
//   };

//   var chart = new ApexCharts(document.querySelector(".chart"), options);
//   chart.render();

//Fin Partie Statistique


//Partie Accueil

var options = {
    series: [
    {
      name: 'Actuel (2023)',
      data: [
        {
          x: 'Jan',
          y: 60,
        },
        {
          x: 'Fev',
          y: 40,
        },
        {
          x: 'Mar',
          y: 45,
        },
        {
          x: 'Avr',
          y: 30,
        },
        {
          x: 'Mai',
          y: 43,
        },
        {
          x: 'Juin',
          y: 32,
        },
        {
          x: 'Juil',
          y: 15,
        },
        {
          x: 'Aôut',
          y: 25,
        },
        {
            x: 'Sept',
            y: 50,
        },
        {
            x: 'Oct',
            y: 35,
        },
        {
            x: 'Nov',
            y: 45,
        },
        {
            x: 'Dec',
            y: 80,
        }
  
      ]
    },

    {
        name: 'Prévision (2024)',
        data: [
          {
            x: 'Jan',
            y: 65,
          },
          {
            x: 'Fev',
            y: 35,
          },
          {
            x: 'Mar',
            y: 60,
          },
          {
            x: 'Avr',
            y: 38,
          },
          {
            x: 'Mai',
            y: 50,
          },
          {
            x: 'Juin',
            y: 31,
          },
          {
            x: 'Juil',
            y: 20,
          },
          {
            x: 'Aôut',
            y: 37,
          },
          {
              x: 'Sept',
              y: 17,
          },
          {
              x: 'Oct',
              y: 30,
          },
          {
              x: 'Nov',
              y: 48,
          },
          {
              x: 'Dec',
              y: 78,
          }
    
        ]
      }
  ],
    chart: {
    height: 350,
    type: 'bar',
    toolbar: {
        show: true  // Cela supprime la barre d'outils
      }
  },
  plotOptions: {
    bar: {
      columnWidth: '70%'
    }
  },
  colors: ['#00E396', '#0e305d'],
  dataLabels: {
    enabled: true
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    customLegendItems: ['Prévision', 'Actuel'],
    markers: {
      fillColors: ['#00E396', '#0e305d']
    }
  },

yaxis: {
    labels: {
        show: true // Affiche les labels de l'axe Y
    },
    max: 100, // Définit la valeur maximale de l'axe Y pour la deuxième série de données (Prévision)
    min: 0, // Définit la valeur minimale de l'axe Y pour la deuxième série de données (Prévision)
    tickAmount: 1 
}
  };

  var chart = new ApexCharts(document.querySelector(".chart"), options);
  chart.render();

//Fin Partie Accueil
