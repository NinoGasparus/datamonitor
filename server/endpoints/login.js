function login(req, res){
    try{
      //  console.log("we go hteres")
        //     console.log(req.body)
             if(req.body.uname && req.body.password){
                 if(users.find(function(user){return user.uname == req.body.uname && user.password== req.body.password})){
                     //user exist
                     console.log(req.body.uname);
                   //  console.log("has login");
                      let token ={token:makeHash(128), id: aliveTokens.length+1}
                      aliveTokens.push({token:token.token, id:token.id, alive:true})
                      
                                 setTimeout(function() {
                                     // Find the token to remove based on its id
                                     
                                     let tokenToRemove = aliveTokens.find(function(tokens) {
                                         return tokens.id === token.id;
                                     });//first time it will be alive and it will than redo after 5min and seeing it false removes the user
                                     if(tokenToRemove.alive){
                                         tokenToRemove.alive = false;
                                         setTimeout(arguments.callee, 1000 * 5 * 60 );
                                         return;
                                     }
                                     let indexToRemove = aliveTokens.indexOf(tokenToRemove);
                                     if (indexToRemove !== -1) {
                                         aliveTokens.splice(indexToRemove, 1);
                                     }
                                     console.log("popped session")
                                 }, 1000); // 5 minutes delay
     
                      res.status(200).send(token).json();
                 }else
                 {
                     res.status(400).send("wrong");
                 }
         }else{
             res.status(500).send("bad request")
         }
         }catch(err){
            console.log(err)
            console.log("server login issue");
             res.status(500).send("server issue");
         }
}

function makeHash(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz@{}[]().,-!"#$%&/123456789';
    let hash = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        hash += characters[randomIndex];
    }
    return hash;
}

module.exports  = {login};