setInterval(() => {
  try {
      fetch(IP + "getmeasurments", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(token)
      }).then((response) => {
          if (response.ok) {
              return response.json()
          } else {
              throw new Error('Network response was not ok.');
          }
      }).then((data) => {
          let temp = document.getElementById("b1");
          let humi = document.getElementById("b2");
          let airq = document.getElementById("b3");
          if (parseFloat(data.temp) >= 30) {
              console.log("alarm!!!!!");
              document.getElementById("alarmButton").style = "display: block"
          }
          temp.innerText = data.temp;
          humi.innerText = data.humi;
          airq.innerText = data.airq;
      }).catch(error => {
          //console.error('Error fetching measurements:', error);
      });
  } catch (error) {
     // console.error("Error during measurement fetch:", error);
  }
}, 1000);



setInterval(() => {
  try {
      fetch(IP + "getaverages", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(token)
      }).then((response) => {
          if (response.ok) {
              return response.json()
          } else {
              throw new Error('Network response was not ok.');
          }
      }).then((data) => {
          if (data == false) {
              return;
          }
          let allTimeTempAverage = document.getElementById("allTimeTempAverage")
          let allTimeHumiAverage = document.getElementById("allTimeHumiAverage")
          let allTimeAirqAverage = document.getElementById("allTimeAirqAverage");

          let allTimeTempHigh = document.getElementById("allTimeTempHigh");
          let allTimeTempLow = document.getElementById("allTimeTempLow");

          let allTimeHumiHigh = document.getElementById("allTimeHumiHigh");
          let allTimeHumiLow = document.getElementById("allTimeHumiLow");

          let allTimeAirqHigh = document.getElementById("allTimeAirqHigh");
          let allTimeAirqLow = document.getElementById("allTimeAirqLow")

          allTimeTempAverage.innerText = data.temps[0];
          allTimeTempHigh.innerText = data.temps[1];
          allTimeTempLow.innerText = data.temps[2];

          allTimeHumiAverage.innerText = data.humidity[0];
          allTimeHumiHigh.innerText = data.humidity[1];
          allTimeHumiLow.innerText = data.humidity[2];

          allTimeAirqAverage.innerText = data.quality[0];
          allTimeAirqHigh.innerText = data.quality[1];
          allTimeAirqLow.innerText = data.quality[2]
      }).catch(error => {
         // console.error('Error fetching averages:', error);
      });
  } catch (error) {
     // console.error("Error during averages fetch:", error);
  }
}, 1000);
