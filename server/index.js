const express = require('express')
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');
const { error, Console } = require('console');
const fs = require('fs');
   
   
const seedrandom = require('seedrandom')
// import pkg from 'express';
// const {express} = pkg;
// const app = pkg;


// import login from './endpoints/login.mjs';   


const login = require('./endpoints/login.js').login;
const get   = require('./endpoints/get.js').get;
const getAverages = require('./endpoints/getAverages.js').getAverages;
const getMeasurments = require('./endpoints/getMeasurments.js').getMeasurments;
const add = require('./endpoints/add.js').add;
const alarmOFF = require('./endpoints/alarm.js').alarmOFF;


global.path  = "./data.json";
//let path = '/home/pi/Desktop/sensor.json'

// global.averages = {
//     temperature: 25,
//     quality: 75,
//     humidity: 75,
// }

// global.lows = {
//     temperature: undefined,
//     quality: undefined,
//     humidity: undefined
// }

// global.highs = {
//     temperature: undefined,
//     quality: undefined,
//     humidity: undefined
// }



global.averages = {
    temperature: "avgTemp",
    quality: "avgQual",
    humidity: "avgHum",
}

global.lows = {
    temperature: undefined,
    quality: undefined,
    humidity: undefined
}

global.highs = {
    temperature: undefined,
    quality: undefined,
    humidity: undefined
}
global.sums = {
    temperature: 0,
    quality: 0,
    humidity: 0
}

global.database = [

]



global.users = [
    {
        id: 0,
        uname: "admin",
        password: "admin"
    }
]
global.aliveTokens = [

]


function onstartdo() {
    //fills the DB with junk data
    let appender = {
        Temperature: undefined,
        Quality: undefined,
        Humidity: undefined,
        Date: undefined,
        Time: undefined
    }
    
    for(let i =0; i < 100; i++){
        appender.Temperature = 25;//generateData(50,5,1);
        appender.Quality = 75;// generateData(50,5,1);
        appender.Humidity = 75;//generateData(50,5,1);
        appender.Date = "NAN";
        appender.Time = "TODAYYYY"
        database.push(appender);
    }
    let timer = new Date();
    




}

app.listen(6969,onstartdo());



app.post('/alarmOFF',(req,res) =>{
    alarmOFF();
})

app.post('/add', (req, res) => {
  add(req,res);
})




app.post('/get', (req, res) => {
    get(req, res);
})

app.post('/login', (req, res) => {
    login(req, res);
})



app.post('/getaverages', (req, res) => {
   getAverages(req,res);

})
app.post('/getmeasurments', (req, res) => {
    getMeasurments(req, res);
})

function callSQL(query) {
    console.log("bingus")
}







let timeout = 100;
//Observe file for change
// Observe file for change
fs.watch(path, (eventType, filename) => {
    if (filename) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            let x = require(path);
            let dataBlock = {
                Temperature: parseFloat(x.temp.toFixed(1)),
                Quality: parseFloat(x.CO.toFixed(1)),
                Humidity: parseFloat(x.AirQuality.toFixed(1)),
                Date: x.Date,
                Time: x.Time
            };

            console.log("current maximum Temperature: " + highs.temperature);
            console.log("datablock temperature: " + dataBlock.Temperature);
            console.log("current maximum Quality: " + highs.quality);
            console.log("datablock quality: " + dataBlock.Quality);
            console.log("current maximum Humidity: " + highs.humidity);
            console.log("datablock humidity: " + dataBlock.Humidity);
            console.log("===============")

            // Update highs
            if (highs.temperature === undefined || highs.temperature < dataBlock.Temperature) {
                console.log("Updating highs.temperature to " + dataBlock.Temperature);
                highs.temperature = dataBlock.Temperature;
            }
            if (highs.quality === undefined || highs.quality < dataBlock.Quality) {
                console.log("Updating highs.quality to " + dataBlock.Quality);
                highs.quality = dataBlock.Quality;
            }
            if (highs.humidity === undefined || highs.humidity < dataBlock.Humidity) {
                console.log("Updating highs.humidity to " + dataBlock.Humidity);
                highs.humidity = dataBlock.Humidity;
            }

            // Update lows
            if (lows.temperature === undefined || lows.temperature > dataBlock.Temperature) {
                console.log("Updating lows.temperature to " + dataBlock.Temperature);
                lows.temperature = dataBlock.Temperature;
            }
            if (lows.quality === undefined || lows.quality > dataBlock.Quality) {
                console.log("Updating lows.quality to " + dataBlock.Quality);
                lows.quality = dataBlock.Quality;
            }
            if (lows.humidity === undefined || lows.humidity > dataBlock.Humidity) {
                console.log("Updating lows.humidity to " + dataBlock.Humidity);
                lows.humidity = dataBlock.Humidity;
            }

            database.push(dataBlock);
            delete require.cache[require.resolve(path)];
        }, 100);
    } else {
        console.log('No');
    }
});





app.post('/readfile', (req, res) => {
    let x = require('./nekaj.json');



    res.status(404).send(x).json();
})

app.post('/graph', (req,res)=>{
    res.status(200).send(database).json();
})


function generateData(base, variance, size) {
    const data = [];
    for (let i = 0; i < size; i++) {
        // Generate a random seed for each iteration
        const seed = Math.random().toString();
        // Set the random seed
        seedrandom(seed);
        
        // Generate a random number between -variance/2 and variance/2
        const randomDelta = (Math.random() - 0.5) * variance;
        // Add the random delta to the base value
        const value = base + randomDelta;
        data.push(value);
    }
    return data;
}

