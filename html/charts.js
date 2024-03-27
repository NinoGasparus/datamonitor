
const ctx = document.getElementById("myChart");
const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];
let tmpData =getData();

//0, 200, 20, 60, 60, 120, NaN, 60, 60, 125, 105, 110, 170];


let data = {
  labels: labels,
  datasets: [
    {
      label: "Temperatures", 
      data: tmpData,
      fill: false,
      borderColor: "#E3655B",
      tension: 0.1,
      cubicInterpolationMode: "monotone",
    },
    {
      label: "Humidity", 
      data: [0, 20, 200, 60, 60, 120, NaN, 60, 60, 125, 105, 110, 170],
      fill: false,
      borderColor: "#5FAD56",
      tension: 0.1,
      cubicInterpolationMode: "monotone",
    },
    {
      label: "AirQuality", 
      data: [0, 20, 200, 60, 60, 120, 220, 180, 120, 205, 200, 110, 170],
      fill: false,
      borderColor: "#8AE1FC",
      tension: 0.1,
      cubicInterpolationMode: "monotone",
    },
  ],
};
new Chart(ctx, {
  type: "line",
  data: data,
  options: {
    scales: {
      y: {},
      y2: {
        position: "none",
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show upaaaaaaa
        },
      },
      y3:{
        position: "none",
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
        
      }
    },
  },
});

function chartHandler(sender){
  switch(sender.id){
    case "timespan1":console.log("bingus");break;
  }
}

function getData(){
let rv  = [];
  console.log("idk");
  
  fetch(IP+ "graph", {
    method: "POST",
}).then((response) => {
  if(response.ok){
    console.log("ok");
    return response.json();
  }else{
    console.log("bad")
  }
}).then((data) => {
    for(let i = 0; i < data.length; i+=10){
      rv.push(data[i].Temperature[0]);
    }
    console.log(rv)
    return rv;
}).catch((error) => {
    console.error('Login error:', error);
});
  console.log(rv)
  return rv;
}