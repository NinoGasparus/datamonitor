function getMeasurments(req,res){
    // console.log("someone requested measurments 3x")
    let sample = {
        temp: "database error",
        humi: "database error",
        airq: "database error"
    }

    let latest = database[database.length - 1];
    sample.temp = latest.Temperature;
    sample.humi = latest.Humidity;
    sample.airq = latest.Quality;
   // console.log(latest)
    // let appender = {
    //     Temperature: Math.random() * 100,
    //     Quality: Math.random() * 100,
    //     Humidity: Math.random() * 100,
    //     Date: "aint doing the date formatting again sry",
    //     Time: "nope"
    // }
    // database.push(appender);
    console.log("sususussu");
    res.status(200).send(sample).json()
}
module.exports = {getMeasurments}