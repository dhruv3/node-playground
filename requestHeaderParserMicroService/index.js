var express = require('express');
var app = express();

app.get('/', function(req, res){
    var absolutePath = __dirname + "/homePage.html"
    res.sendFile(absolutePath) 
})

app.get('/api/whoami', function(req, res){
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const sysInfo = req.get('User-Agent');
    const preferedLan = req.headers["accept-language"];
    const retObj ={
        "ipaddress": ip,
        "language": preferedLan,
        "software": sysInfo
    }
    res.end(JSON.stringify(retObj));
})

app.listen(3000);