function getAverages(req, res){
    try {
       
        if (req.body.token) {
            const tokenExists = aliveTokens.find(token => token.token === req.body.token);

            if (tokenExists) {
    
                let resposnse = {
                    temps: [
                        averages.temperature,
                        highs.temperature,
                        lows.temperature
                    ],
        
                    quality: [
                        averages.quality,
                        highs.quality,
                        lows.quality
                    ],
        
                    humidity: [
                        averages.humidity,
                        highs.humidity,
                        lows.humidity
                    ]
                }
        
                res.status(200).send(resposnse).json();
            } else {
               
                console.log("Invalid token");
                res.status(401).send("Invalid token");
            }
        } else {
           
            console.log("Token not provided");
            res.status(400).send("Token not provided");
        }

    } catch {
        res.status(500).send("server issues");
    }
}

module.exports = { getAverages};