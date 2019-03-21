console.log("HTTP Server");

var http = require('http')
var handlerMethod = function(req, res){
    res.end("This is a simple response from a simple server");
}
http.createServer(handlerMethod).listen(3000, 'localhost');
console.log("A simple web server is listening");