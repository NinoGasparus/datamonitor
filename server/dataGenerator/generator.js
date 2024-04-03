
const fs = require('fs');

let timeout = 100;
//Observe file for change
fs.watch(path, (eventType, filename) => {
//    console.log(`Event type: ${eventType}`);
    if (filename) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
                let x = require(path);

             console.log(x);
            //if(x.Temperature && x.Quality && x.Humidity && x.Date && x.Time){
                let dataBlock = {
                    Temperature: x.temp,
                    Quality: x.CO,
                    Humidity: x.AirQuality,
                    Date: x.Date,
                    Time: x.Time

                    
                }

                database.push(dataBlock);
                console.log("got some data");
                delete require.cache[require.resolve(path)];

          //  }else{
            //            console.log("inccoretd datafortmata2")
           // }
                
        }, 100); 

    } else {
        console.log('No');
    }
});
