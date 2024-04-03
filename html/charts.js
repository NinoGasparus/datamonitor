const ctx = document.getElementById("myChart");
let labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];
let chart1 =  [0];
let chart2 = [0];
let chart3 =  [0];
let dataAmount = 7;
// Create the chart and assign it to a variable
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Temperatures", 
        data: chart1,
        fill: false,
        borderColor: "#E3655B",
        tension: 0.1,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Humidity", 
        data: chart2,
        fill: false,
        borderColor: "#5FAD56",
        tension: 0.1,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "AirQuality", 
        data: chart3,
        fill: false,
        borderColor: "#8AE1FC",
        tension: 0.1,
        cubicInterpolationMode: "monotone",
      },
    ],
  },
  options: {
    scales: {
      y: {},
      y2: {
        position: "none",
        grid: {
          drawOnChartArea: false,
        },
      },
      y3: {
        position: "none",
        grid: {
          drawOnChartArea: false,
        },
      }
    },
  },
});

function fetchData() {
  return fetch(IP + "graph", {
    method: "POST",
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch data");
    }
  });
}

function updateChart() {
  fetchData()
    .then((data) => {
      let tmp = [];
      chart1 = [];
      chart2 = [];
      chart3 = [];
      for(let i =data.length-dataAmount; i < data.length; i+=1){
      // console.log(data[i].Temperature);
      
       chart1.push(data[i].Temperature);
       chart2.push(data[i].Quality);
       chart3.push(data[i].Humidity);
      }
      // console.log(data.length);
      // console.log(chart1);
      myChart.data.datasets[0].data = chart1;
      myChart.data.datasets[1].data = chart2;
      myChart.data.datasets[2].data = chart3;
      myChart.update();
      chart1 = [];
      chart2 = [];
      chart3 = [];
      // const newTemperature = data.map((item) => item.Temperature[0]); // Extract temperature data
      // myChart.data.datasets[0].data = newTemperature;
      // myChart.update();
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}
setInterval(() => {
updateChart();

}, 1000);


function chartHandler(sender){
  console.log(sender.id);

const currentTime = new Date();



  switch(sender.id){
    case 'timespan1': 
    for (let i = 0; i < 10; i++) {
      labels[i] = new Date(currentTime.getTime() - (10 - i) * 1000).toISOString().slice(11, 19);
    }
    dataAmount= 10;
    myChart.update();
    break;
    case 'timespan2': 
    case 'timespan3':
    case 'timespan4':
    case 'timespan5':
    case 'timespan6':
    case 'timespan7':
    case 'timespan8': 
  }
}