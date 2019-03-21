var request = require('request');
var fs = require('fs');

request('http://localhost:3000/hello', function(err, response, body){
    if(err){
        console.log(err);
    }
    //response body
    console.log(response.body);
    //status code
    console.log(response.statusCode);
    //see header
    console.log(response.headers);
})
.pipe(fs.createWriteStream("./DemoData/pipeFile.txt"))

var options = {
    url: "http://localhost:3000/printRequestHeaders",
    headers: {'X-DEMO-HEADER': "myDemoHeader"}
}

var callback = function(err, response, body){
    if(err){
        console.log(err);
    }
    else{
        console.log(body);
    }
}

request(options, callback);