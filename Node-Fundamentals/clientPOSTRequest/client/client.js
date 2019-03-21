var request = require('request');
var fs = require('fs');

var data = {
    userFirstName: "John",
    userLastName: "Cena",
    myBuffer: new Buffer([1]),//buffer for passing file data
    myFile: fs.createReadStream(__dirname + "/img/spinach.jpg")//read stream containing file data to pass
}

//request.post('http://localhost:3000/').form(data);
request.post('http://localhost:3000/',{form: data});

var callback = function(err, response, body){
    if(err){
        console.log(err);
    }
    else{
        console.log(body);
    }
}

request.post('http://localhost:3000/',{form: data}, callback);