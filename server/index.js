const express = require('express')
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());


app.listen(420, onStartDo = () =>{
    //fills the DB with junk data
    let appender = {
        Temperature: undefined,
        Quality:     undefined,
        Humidity:    undefined,
        Date:        undefined,
        Time:        undefined
    }

   let timer = new Date();
   for(let i =0; i < 1000; i++){
    let rv = Math.random(timer.getSeconds());
 appender.Temperature = rv*100;
 appender.Quality = rv*100;
 appender.Humidity =  rv*100;

 appender.Date =  timer.getFullYear() + "-";
 if(timer.getMonth().toString().length == 1){
    appender.Date+="0" +timer.getMonth()+"-";
 }else{
    appender.Date+=timer.getMonth()+"-";
 }
 if(timer.getDate().toString().length == 1){
    appender.Date+="0"+timer.getDate();
 }else{
    appender.Date+=timer.getDate() ;
 }

 if(timer.getHours().toString().length == 1){
    appender.Time="0" + timer.getHours() + "-";
}else{
    appender.Time= timer.getHours() +"-";
}

if(timer.getMinutes().toString().length==1){
    appender.Time+="0" + timer.getMinutes() + "-";
 }else{
     appender.Time+=timer.getMinutes() + "-";
 }
 
 if(timer.getSeconds().toString().length == 1){
     appender.Time+="0" + timer.getSeconds();
 }else{
     appender.Time+=timer.getSeconds();
 }
 

 


 database.push(appender)
}
    

})



let averages ={
    temperature: "avgTemp",
    quality: "avgQual",
    humidity: "avgHumi",
}

let lows = {
    temperature: "tempLow",
    quality: "qualLow",
    humidity: "humiLow"
}

let highs = {
    temperature: "tempHigh",
    quality: "qualHigh",
    humidity: "humiHigh"
}

let database =[
    
]



let users = [
    {
        id: 0,
        uname: "admin",
        password:"admin"
    }
]
let aliveTokens = [

]

app.post('/add',(req,res) =>{
    try{
        console.log("prejel sporočilo");
        
        try{
            if(req.body.Temperature && req.body.Quality && req.body.Humidity && req.body.Date && req.body.Date && req.body.Time){
                console.log("Data inserted")
                //console.log(req.body);
                
                let dataBlock = {
                    Temperature: req.body.Temperature,
                    Quality: req.body.Quality,
                    Humidity: req.body.Humidity,
                    Date: req.body.Date,
                    Time: req.body.Time
                }


                if(dataBlock.Temperature > highs.temperature){
                    highs.temperature = dataBlock.Temperature
                }
                if(dataBlock.humidity > highs.humidity){
                    highs.humidity = dataBlock.humidity
                }

                if(dataBlock.Temperature < lows.temperature){
                    lows.temperature = dataBlock.Temperature;
                }


                database.push(dataBlock)
                res.status(200).send()


            }else{
                
                goto(nepravilno);
            }
        }catch{
            nepravilno:
           // console.log("nepopolna zahteva")
            res.status(500).send("Nepravilna zahteva")
        }   
    }catch{
        res.status(500).send("server ma težave")
    }
})




app.post('/get', (req,res) =>{
  try{
   // console.log(req)
    console.log("someone greppin")
        try{
           // console.log(database)
            if(req.body.amount && req.body.categories && req.body.amount >= 1){
                
                console.log(database)
                

             //to be sent back
                let returnPacket = [];


                // the upper limit how many to send back
                let count = req.body.amount;
                //if database is shorter than the number user wants, set the limit to the lenght of theDB
                if(database.length < req.body.amount){
                    count = database.length;
                }


                for(let i = 0; i <count;i++){
                   
                    //empty frame
                    let appender = {
                        Temperature: undefined,
                        Quality:     undefined,
                        Humidity:    undefined,
                        Date:        undefined,
                        Time:        undefined
                    }
                    let elementofDB = database[i];
                    
                    //if true instert temperature into the frame...
                    if(req.body.categories[0]){
                        appender.Temperature = elementofDB.Temperature
                    }
                    if(req.body.categories[1]){
                        appender.Quality = elementofDB.Quality;
                    }
                    if(req.body.categories[2]){
                        appender.Humidity = elementofDB.Humidity
                    }
                    if(req.body.categories[3]){
                        appender.Date = elementofDB.Date
                    }
                    if(req.body.categories[4]){
                        appender.Time = elementofDB.Time
                    }
                  //  console.log(appender)

                  //add the frame to the return array
                    returnPacket.push(appender);
                }


            
                console.clear()
                //console.log(returnPacket)


                //send back the return array
                res.status(200).send(returnPacket).json()
                
            }
        }catch{
           goto(nepravilno);
        }
    }catch{
        res.status(500).send("server ma težave")
    }

})

app.post('/login', (req,res) =>{
    try{
   //     console.log(req.body)
        if(req.body.uname && req.body.password){
            if(users.find(function(user){return user.uname == req.body.uname && user.password== req.body.password})){
                //user exist
                console.log(req.body.uname);
                
                 let token ={token:makeHash(128), id: aliveTokens.length+1}
                 aliveTokens.push({token:token.token, id:token.id, alive:true})
                 
                            setTimeout(function() {
                                // Find the token to remove based on its id
                                
                                let tokenToRemove = aliveTokens.find(function(tokens) {
                                    return tokens.id === token.id;
                                });//first time it will be alive and it will than redo after 5min and seeing it false removes the user
                                if(tokenToRemove.alive){
                                    tokenToRemove.alive = false;
                                    setTimeout(arguments.callee, 1000 * 10 );
                                    return;
                                }
                                let indexToRemove = aliveTokens.indexOf(tokenToRemove);
                                if (indexToRemove !== -1) {
                                    aliveTokens.splice(indexToRemove, 1);
                                }
                                console.log("popped session")
                            }, 1000); // 5 minutes delay

                 res.status(200).send(token).json();
            }else
            {
                res.status(400).send("wrong");
            }
    }else{
        res.status(500).send("bad request")
    }
    }catch{
        res.status(500).send("server issue");
    }
})

function makeHash(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz@{}[]().,-!"#$%&/123456789';
    let hash = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        hash += characters[randomIndex];
    }
    return hash;
}

app.post('/getaverages', (req, res) =>{
   try{
    console.log("someone requested average data")

    //  averages.temperature = Math.floor(Math.random() * 100);
    //  highs.temperature = Math.floor(Math.random()*100);
    //  lows.temperature = Math.floor(Math.random()*100);
        let resposnse = {
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

        res.status(200).send(resposnse).json();
    }catch{
        res.status(500).send("server ma težave");
    }



})


function callSQL(query){
    console.log("bingus")
}

app.post('/getmeasurments',(req,res) =>{
    console.log("someone requested measurments 3x")
    let sample = {
        temp: "database error",
        humi: "database error",
        airq: "database error"
     } 
     
     let latest = database[database.length-1];
     sample.temp = latest.Temperature;
    sample.humi = latest.Humidity;
    sample.airq = latest.Quality;

    let appender = {
        Temperature: Math.random()*100,
        Quality:     Math.random()*100,
        Humidity:    Math.random()*100,
        Date:        "aint doing the date formatting again sry",
        Time:        "nope"
    }
    database.push(appender);
    res.status(200).send(sample).json()
})