var express = require('express');
var app = express();

app.get('/api/timestamp/:date_string?', function(req, res){
    res.end(JSON.stringify(req.params) + "\n" + JSON.stringify(req.query) + "\n" + JSON.stringify(req.route)) 
})
// app.use(function(req, res){
    
//     if(req.method.toLowerCase() == "get"){
        
//         // var absolutePath = __dirname + "/success.html"
//         // res.sendFile(absolutePath)
//     }
//     //res.end("Form data received");
// })
app.listen(3000);