const IP = "http://127.0.0.1:420/"

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const loginClose = document.getElementById('login-close');
    const loginContent = document.getElementById('login-content');

    if (loginButton) {
      loginButton.addEventListener('click', () => {
        loginContent.classList.add("show-login");
      });
    }

    if (loginClose) {
      loginClose.addEventListener('click', () => {
        loginContent.classList.remove('show-login');
      });
    }
  });

setInterval(() => {
    let timer = new Date()
    let composeTime ="";

    switch (timer.getMonth()){
        case 0: composeTime+="Jan";break;
        case 1: composeTime+="Feb";break;
        case 2: composeTime+="Mar";break;
        case 3: composeTime+="Apr";break;
        case 4: composeTime+="May";break;
        case 5: composeTime+="Jun";break;
        case 6: composeTime+="Jul";break;
        case 7: composeTime+="Aug";break;
        case 8: composeTime+="Sep";break;
        case 9: composeTime+="Oct";break;
        case 10:composeTime+="Nov";break;
        case 11:composeTime+="Dec";break;
    }

   
    composeTime+=" " + timer.getDate()
    
   
    switch(timer.getDate()){
        case 1: composeTime+="st";break;
        case 2: composeTime+="nd";break;
        case 3: composeTime+="rd";break;
        default: composeTime+="th";break;
    }

  

    time = "";
    
    //following ifs are here to fix this scenario:
    // its 3am in the morning, 15minutes and 5seconds
    // without this ifs it will show up as 3:15:5 which is horrendus if you ask me
    // if's just add zeros in front of any time value which is single character long
    // so it corrects the  3:15:5 to 03:15:05 more better
    

    if(timer.getHours().toString().length == 1){
        time+="0" + timer.getHours() + ":";
    }else{
        time+= timer.getHours() +":";
    }

    if(timer.getMinutes().toString().length==1){
        time+="0" + timer.getMinutes() + ":";
    }else{
        time+=timer.getMinutes() + ":";
    }

    if(timer.getSeconds().toString().length == 1){
        time+="0" + timer.getSeconds();
    }else{
        time+=timer.getSeconds();
    }


   

    document.getElementById("current_time").innerText =composeTime;
    document.getElementById("current_time").innerHTML +="<br>" + time;
}, 1);

setInterval(() => {
 try {
  fetch(IP+"getmeasurments",{
        method: "POST"
    }).then((response)=>{
        if(response.ok){
            return response.json()
        }else{
         
        }
    }).then((data)=>{


        let temp = document.getElementById("b1");
        let humi = document.getElementById("b2");
        let airq = document.getElementById("b3");

        temp.innerText = data.temp;
        humi.innerText = data.humi;
        airq.innerText = data.airq;
        
        if(data.temp >= 50){
        
         let fans =  document.getElementsByClassName("alarmFans");
  
          for( let i = 0; i < fans.length ; i++){
            fans[i].style.display = "block"
          }
        }else{

          let fans =  document.getElementsByClassName("alarmFans");
          for( let i = 0; i < fans.length ; i++){
            fans[i].style.display = "none"
          }
        }
        

   })
  }catch(error){
    console.log("server failed to return statistics")
  }
}, 1000);


setInterval(() => {
  try{ 
  fetch(IP+"getaverages",{
        method: "POST"
    }).then((response)=>{
        if(response.ok){
            return response.json()
        }else{
          console.log("server failed to respond to statistics request")
        }
    }).then((data)=>{


      let allTimeTempAverage = document.getElementById("allTimeTempAverage")
      let allTimeHumiAverage = document.getElementById("allTimeHumiAverage")
      let allTimeAirqAverage = document.getElementById("allTimeAirqAverage");
    
      let allTimeTempHigh = document.getElementById("allTimeTempHigh");
      let allTimeTempLow = document.getElementById("allTimeTempLow");

      let allTimeHumiHigh = document.getElementById("allTimeHumiHigh");
      let allTimeHumiLow = document.getElementById("allTimeHumiLow");

      let allTimeAirqHigh = document.getElementById("allTimeAirqHigh");
      let allTimeAirqLow = document.getElementById("allTimeAirqLow")


      //server return packet reference
      /*
      resposnse = {
            temps : [
                averages.temperature,
                highs.temperature,
                lows.temperature
            ],

            quality : [
                averages.quality,
                highs.quality,
                lows.quality
            ],

            humidity : [
                averages.humidity,
                highs.humidity,
                lows.humidity
            ]
        } 
      */


      allTimeTempAverage.innerText = data.temps[0];
      allTimeTempHigh.innerText = data.temps[1];
      allTimeTempLow.innerText = data.temps[2];

      allTimeHumiAverage.innerText = data.humidity[0];
      allTimeHumiHigh.innerText = data.humidity[1];
      allTimeHumiLow.innerText = data.humidity[2];

      allTimeAirqAverage.innerText = data.quality[0];
      allTimeAirqHigh.innerText = data.quality[1];
      allTimeAirqLow.innerText = data.quality[2]


    }) 
  }catch(error){
   
  }
}, 1000);

