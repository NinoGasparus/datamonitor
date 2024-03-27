
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



   