function getMeasurments(req,res){

    if(req.token){
        console.log(req.token);
    }
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
  
    res.status(200).send(sample).json()
}
module.exports = {getMeasurments}