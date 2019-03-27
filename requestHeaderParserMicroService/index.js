var express = require('express');
var app = express();

app.get('/', function(req, res){
    var absolutePath = __dirname + "/homePage.html"
    res.sendFile(absolutePath) 
})

app.get('/api/whoami', function(req, res){
    res.end("hmm");
})

app.listen(3000);