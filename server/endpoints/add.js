function add(req,res){
    try {
        console.log("data recieved");

        try {
            if (req.body.Temperature && req.body.Quality && req.body.Humidity && req.body.Date && req.body.Date && req.body.Time) {
                console.log("Data inserted")
                //console.log(req.body);

                let dataBlock = {
                    Temperature: req.body.Temperature,
                    Quality: req.body.Quality,
                    Humidity: req.body.Humidity,
                    Date: req.body.Date,
                    Time: req.body.Time
                }


                if (dataBlock.Temperature > highs.temperature) {
                    highs.temperature = dataBlock.Temperature
                }
                if (dataBlock.humidity > highs.humidity) {
                    highs.humidity = dataBlock.humidity
                }

                if (dataBlock.Temperature < lows.temperature) {
                    lows.temperature = dataBlock.Temperature;
                }


                database.push(dataBlock)
                res.status(200).send()


            } else {

                goto(error);
            }
        } catch {
            error:

            res.status(500).send("bad request")
        }
    } catch {
        res.status(500).send("server issue")
    }
}

module.exports = {add}