const fs = require('fs');
   


function alarmOFF(){
    let stop  = true
    fs.writeFile('/home/pi/Dekstop/buzzer_stop.json', JSON.stringify({ stop: stop }), function(err) {
        if (err) {
            console.log("Error writing file:", err);
        } else {
            console.log("File written successfully.");
        }
    });
console.log("alarmo off recieved2)");
}

module.exports = {alarmOFF};