require("dotenv").config(); // parse .env file
require("./config/mongo");

const express = require("express"); // really needed
const server = express(); // create the server with the express function
const cors = require("cors"); // create the server with the express function
const login = require('./routes/loginRouter');
const register = require('./routes/registerRouter');

var User = require("./routes/users")
// we n eed to parse json body in HTTP requests
// this middleware exactly does that : )
server.use(express.json());

// authorize ajax call from specified clients
server.use(cors("*"));


server.get("/", (req, res) => { // setup a nase route ...
  res.send("ok poto"); // sending back a simple string as a response for each request on http://localhost:9000/
});

server.listen(process.env.PORT, () => {
    console.log("simple-backend started @ http://localhost:" + process.env.PORT);
}); // access .env key/values

server.use('/api/user',User);
server.use('/login',login);
server.use('/register',register);