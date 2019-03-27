var express = require('express');
var app = express();

app.get('/', function(req, res){
    var absolutePath = __dirname + "/homePage.html"
    res.sendFile(absolutePath) 
})

app.get('/api/timestamp/:date_string?', function(req, res){
    const date_string = req.params.date_string;
    let obj = new Date(parseInt(date_string));
    //check required to handle "2015-10-03" format dates
    if(date_string.indexOf("-") != -1){
        obj = new Date(date_string);
    }
    const retObj = {
        "unix": obj.getTime(),
        "utc": obj.toUTCString()
    }
    res.end(JSON.stringify(retObj));
    // res.end(JSON.stringify(req.params) + "\n" + JSON.stringify(req.query) + "\n" + JSON.stringify(req.route)) 
})
// app.use(function(req, res){
    
//     if(req.method.toLowerCase() == "get"){
        
//         // var absolutePath = __dirname + "/success.html"
//         // res.sendFile(absolutePath)
//     }
//     //res.end("Form data received");
// })
app.listen(3000);