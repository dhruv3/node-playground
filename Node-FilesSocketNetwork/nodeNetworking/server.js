console.log("Creating a TCP server using NET module");

const net = require('net');

const server = net.createServer();

let numConnections = 0;

server.on('connection', function(socket){
    console.log("TCP Server has received a connection");
    numConnections++;
    socket.write("Welcome. There are " + numConnections + " active connections");
})

server.listen(4567, function(){
    console.log("TCP Server Listening");
})