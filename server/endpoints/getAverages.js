function getAverages(req, res){
    try {
       
        //console.log("dataAveragesRequ")
       // console.log(highs.quality);
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