function get(req, res){
    try {
    // console.log(req)
    console.log("data request recieved")
    try {
        // console.log(database)
        if (req.body.amount && req.body.categories && req.body.amount >= 1) {

            console.log(database)


            //to be sent back
            let returnPacket = [];


            // the upper limit how many to send back
            let count = req.body.amount;
            //if database is shorter than the number user wants, set the limit to the lenght of theDB
            if (database.length < req.body.amount) {
                count = database.length;
            }


            for (let i = 0; i < count; i++) {

                //empty frame
                let appender = {
                    Temperature: undefined,
                    Quality: undefined,
                    Humidity: undefined,
                    Date: undefined,
                    Time: undefined
                }
                let elementofDB = database[i];

                //if true instert temperature into the frame...
                if (req.body.categories[0]) {
                    appender.Temperature = elementofDB.Temperature
                }
                if (req.body.categories[1]) {
                    appender.Quality = elementofDB.Quality;
                }
                if (req.body.categories[2]) {
                    appender.Humidity = elementofDB.Humidity
                }
                if (req.body.categories[3]) {
                    appender.Date = elementofDB.Date
                }
                if (req.body.categories[4]) {
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
    } catch {
        goto(nepravilno);
    }
} catch {
    res.status(500).send("server issue")
}
}


module.exports = {get}