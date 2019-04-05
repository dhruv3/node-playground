const path = require('path');
const express = require('express');
const  http = require("http");

const app = express();
app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname + "/../client/homePage.html"));
})

//https://expressjs.com/en/starter/static-files.html
app.use(express.static(path.resolve(__dirname + "/../client/")));
http.createServer(app).listen(3000)