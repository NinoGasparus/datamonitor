/*manages the functionality of the clock on the homepage*/
setInterval(() => {
    let timer = new Date()
    let composeTime ="";

    switch (timer.getMonth()){
        case 0: composeTime+="Jan";break;
        case 1: composeTime+="Feb";break;
        case 2: composeTime+="Mar";break;
        case 3: composeTime+="Apr";break;
        case 4: composeTime+="May";break;
        case 5: composeTime+="Jun";break;
        case 6: composeTime+="Jul";break;
        case 7: composeTime+="Aug";break;
        case 8: composeTime+="Sep";break;
        case 9: composeTime+="Oct";break;
        case 10:composeTime+="Nov";break;
        case 11:composeTime+="Dec";break;
    }

   
    composeTime+=" " + timer.getDate()
    
   
    switch(timer.getDate()){
        case 1: composeTime+="st";break;
        case 2: composeTime+="nd";break;
        case 3: composeTime+="rd";break;
        default: composeTime+="th";break;
    }

  

    time = "";
    
    //following ifs are here to fix this scenario:
    // its 3am in the morning, 15minutes and 5seconds
    // without this ifs it will show up as 3:15:5 which is horrendus if you ask me
    // if's just add zeros in front of any time value which is single character long
    // so it corrects the  3:15:5 to 03:15:05 more better
    

    if(timer.getHours().toString().length == 1){
        time+="0" + timer.getHours() + ":";
    }else{
        time+= timer.getHours() +":";
    }

    if(timer.getMinutes().toString().length==1){
        time+="0" + timer.getMinutes() + ":";
    }else{
        time+=timer.getMinutes() + ":";
    }

    if(timer.getSeconds().toString().length == 1){
        time+="0" + timer.getSeconds();
    }else{
        time+=timer.getSeconds();
    }


   

    document.getElementById("current_time").innerText =composeTime;
    document.getElementById("current_time").innerHTML +="<br>" + time;
}, 1);
