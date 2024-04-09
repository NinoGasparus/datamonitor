// const { captureRejectionSymbol } = require("stream");

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
let currentTimeSpanMode = null;
let step = 1;
let tens = 0.01;
// Create the chart and assign it to a variable
const myChart = new Chart(ctx, {
  type: "line",
  options:{
    animation: {
      duration: 0, // Disable animations
    },
  },
  data: {
    labels: labels,
    datasets: [
      {
        label: "Temperatures", 
        data: chart1,
        fill: false,
        borderColor: "#E3655B",
        tension: tens,
         cubicInterpolationMode: "monotone",
      },
      {
        label: "CO2", 
        data: chart2,
        fill: false,
        borderColor: "#5FAD56",
        tension: tens,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Gas", 
        data: chart3,
        fill: false,
        borderColor: "#8AE1FC",
        tension: tens,
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
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token)
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return false;
    }
  });
}

function updateChart() {
  fetchData()
    .then((data) => {
      if(data == false){
        return;
      }
      let tmp = [];
      chart1 = [];
      chart2 = [];
      chart3 = [];
      for(let i =data.length-dataAmount; i+step < data.length; i+=step){
      // console.log(data[i].Temperature);
      if(step != 1){
        let sumtemp = 0;
        let summqual =0;
        let sumhum =0;

        for(let j = i; j < i+step; j++){
            sumtemp+=data[j].Temperature;
            summqual+=data[j].Quality;
            sumhum+=data[j].Humidity;
        }
        sumtemp /= step;
        summqual/= step;
        sumhum /= step;
        chart1.push(sumtemp);
       chart2.push(summqual);  
       chart3.push(sumhum);

      }else{
       chart1.push(data[i].Temperature);
       chart2.push(data[i].Quality);
       chart3.push(data[i].Humidity);
      }
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
chartHandler();

}, 1000);


function chartHandler(sender){

  
  const currentTime = new Date();


    for (let i = 0; i <30; i++) {
      labels[i] = new Date(currentTime.getTime() - (30-i) * 1000).toISOString().slice(11, 19);
    }
    dataAmount= 31;
    step = 1;
    //currentTimeSpanMode = sender;
    myChart.update();
    
}