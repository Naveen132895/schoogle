require("./config/mongo");                                  // include mongo Connection

const express = require("express");                         // really needed
const server = express();                                   // create the server with the express function
const cors = require("cors");                               // create the server with the express function

//const User = require("./routes/userRouter");
//const Class = require('./routes/classRouter');
const login = require('./routes/loginRouter');
const register = require('./routes/registerRouter');

server.use(express.json());                                 // this middleware exactly does that : )
server.use(cors("*"));                                      // authorize ajax call from specified clients

//server.get("/", (req, res) => { 
//  res.send("Server Started");             // sending back a simple string as a response, when http://localhost:9000/ calls.
//});

server.listen(process.env.PORT, () => {                      // access .env key/values and starting server in respected port
    console.log("simple-backend started @ http://localhost:" + process.env.PORT);   
}); 

//server.use('/user', User);                                   //creating api router for User Operation
//server.use('/class', Class);
server.use('/login', login);                                 //creating api router for login Operation
server.use('/register', register);                           //creating api router for register Operation
