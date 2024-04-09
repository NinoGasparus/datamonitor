function getMeasurments(req, res) {
    if (req.body.token) {
        // Check if the token exists in aliveTokens array
        const tokenExists = aliveTokens.find(token => token.token === req.body.token);
        if (tokenExists) {


            let sample = {
                temp: "database error",
                humi: "database error",
                airq: "database error"
            };
            let latest = database[database.length - 1];
            if (latest) {
                sample.temp = latest.Temperature;
                sample.humi = latest.Humidity;
                sample.airq = latest.Quality;
            }
            res.status(200).json(sample);
        
        
        } else {
            res.status(401).send("Invalid token");
        }
    } else {
       
        res.status(400).send("Token not provided");
    }

 //   res.status(400).send("error");
}

module.exports = { getMeasurments };
