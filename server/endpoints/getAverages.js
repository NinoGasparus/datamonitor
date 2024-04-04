function getAverages(req, res){
    try {
         console.log("someone requested average data")
          
            
        //  averages.temperature = Math.floor(Math.random() * 100);
        //  highs.temperature = Math.floor(Math.random()*100);
        //   lows.temperature = Math.floor(Math.random()*100);

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
    } catch {
        res.status(500).send("server issues");
    }
}

module.exports = { getAverages};