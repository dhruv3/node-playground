var express = require('express');
var app = express();

app.get('/', function(req, res){
    var absolutePath = __dirname + "/homePage.html"
    res.sendFile(absolutePath) 
})

app.get('/api/timestamp/:date_string?', function(req, res){
    const date_string = req.params.date_string;
    let date_Obj = {};
    // res.end(date_string)
    if(date_string == undefined){
        date_Obj = new Date();
    }
    //check required to handle "2015-10-03" format dates
    else if(date_string.indexOf("-") != -1){
        date_Obj = new Date(date_string);
    }
    else{
        date_Obj = new Date(parseInt(date_string));
    }
    let retObj = {
        "unix": date_Obj.getTime(),
        "utc": date_Obj.toUTCString()
    }
    if(retObj.utc == "Invalid Date"){
        retObj = {"error" : "Invalid Date" };
    }
    res.end(JSON.stringify(retObj));
})

app.listen(3000);