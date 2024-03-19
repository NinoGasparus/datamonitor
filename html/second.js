let token;

function postData(){
    

    let temp =  document.getElementById("Temperature");
    let qual =  document.getElementById("Quality");
    let humi =  document.getElementById("Humidity");
    let date =  document.getElementById("Date");
    let time =  document.getElementById("Time");

    




    
        
        
        let data = {
            Temperature:    temp.value,
            Quality:        qual.value,
            Humidity:       humi.value,
            Date:           date.value,
            Time:           time.value,
        }

        fetch("http://127.0.0.1:420/add", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
    
            body: JSON.stringify(data)
        }).then((response) =>{
            if(response.ok){
                document.getElementById("insertError").style = "color: #ffffff"
            }else{
                document.getElementById("insertError").style = "color: #ff0000"
            }
        })
}




function getData(){

    let data = {
        amount: document.getElementById("getCount").value,
        categories: [
            document.getElementById("getTemperature").checked,
            document.getElementById("getQualiy").checked,
            document.getElementById("getHumidity").checked,
            document.getElementById("getDate").checked,
            document.getElementById("getTime").checked,
        ]
    }

    fetch("http://127.0.0.1:420/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
           // console.log("works")
            return response.json();
          } else {
            return response.text().then((errorMessage) => {
              console.log(errorMessage);
            });
          }
        })
        .then((data) => {
        // console.log("data recieved")
         //console.log(data);

         let tabela = document.getElementById("returnField");
            while(true){
                if(tabela.childNodes.length >2){
                    tabela.removeChild(tabela.lastChild);
                }else{
                    break;
                }
            }


         for(let i =0 ; i <  data.length; i++){
            let column = document.createElement('tr')

            let tmp1 = document.createElement('td')
            if(data[i].Temperature) {
                tmp1.innerText = data[i].Temperature;
            }else{
                tmp1.innerText = "---"
            }

            let tmp2 = document.createElement('td')
            if(data[i].Quality) {
                tmp2.innerText = data[i].Quality;
            }else{
                tmp2.innerText = "---"
            }


            let tmp3 = document.createElement('td')
            if(data[i].Humidity) {
                tmp3.innerText = data[i].Humidity;
            }else{
                tmp3.innerText = "---"
            }


            let tmp4 = document.createElement('td')
            if(data[i].Date) {
                tmp4.innerText = data[i].Date;
            }else{
                tmp4.innerText = "---"
            }

            let tmp5 = document.createElement('td')
            if(data[i].Time) {
                tmp5.innerText = data[i].Time;
            }else{
                tmp5.innerText = "---"
            }
            column.appendChild(tmp1)
            column.appendChild(tmp2)
            column.appendChild(tmp3)
            column.appendChild(tmp4)
            column.appendChild(tmp5)
            tabela.appendChild(column);
         }
        })
        .catch((error) => {
          console.log("SOMETHING WENT WRONG...");
            return;
        });

       
        
        
        
}


function login() {
    console.log("Login function called");
    let user = {
        uname: document.getElementById("uname").value,
        password: document.getElementById("password").value
    };

    fetch("http://127.0.0.1:420/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then((response) => {
        if (response.ok) {
            let loginErrorElement = document.getElementById("loginError");
            if (loginErrorElement) {
                loginErrorElement.style.color = "#ff0000";
            } else {
                console.error("Login error element not found!");
            }
            return response.json();
        } else {
            document.getElementById("loginError").innerText = "Login failed";
            document.getElementById("loginError").style.color = "#ff0000";
            throw new Error('Login failed');
        }
    }).then((data) => {
        let token = {token: data.token, id: data.id};
        console.log(token);
        
        document.getElementById("username").innerText = user.uname;
        document.getElementById("username-display").style.display = "block";

        document.getElementById("login-content").style.display = "none";
    }).catch((error) => {
        console.error('Login error:', error);
    });
}