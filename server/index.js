const express = require('express')
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');
const { error } = require('console');
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

global.averages = {
    temperature: "avgTemp",
    quality: "avgQual",
    humidity: "avgHumi",
}

global.lows = {
    temperature: "tempLow",
    quality: "qualLow",
    humidity: "humiLow"
}

global.highs = {
    temperature: "tempHigh",
    quality: "qualHigh",
    humidity: "humiHigh"
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
        appender.Temperature = generateData(50,5,1);
        appender.Quality = generateData(50,5,1);
        appender.Humidity = generateData(50,5,1);
        appender.Date = "NAN";
        appender.Time = "TODAYYYY"
        database.push(appender);
    }
    let timer = new Date();
    




}

app.listen(6969)//donstartdo());



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
fs.watch(path, (eventType, filename) => {
//    console.log(`Event type: ${eventType}`);
    if (filename) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
                let x = require(path);

             //console.log(x);
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

// // Create a connection to the MySQL database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password'
// });

// // Connect to the database
// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL database: ' + err.stack);
//         return;
//     }
//     console.log('Connected to MySQL database as ID ' + connection.threadId);
// });
// connection.query('USE test', (error, resoults, fields) => {
//     if (!error) {
//         console.log("should work");
//     }
// });


// connection.query('SELECT * from ljudje', (error, resoults) => {
//     if (!error) {
//         try {
//             console.log(resoults[1].ime);
//         } catch {
//             console.log("i do not have what you seek");
//         }
//     } else {
//         console.log(error)
//     }
// });


// // Close the connection
// connection.end((err) => {
//     if (err) {
//         console.error('Error closing connection: ' + err.stack);
//         return;
//     }
//     console.log('Connection closed');
// });



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

