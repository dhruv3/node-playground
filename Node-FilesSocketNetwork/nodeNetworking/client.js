console.log("Creating a TCP client using NET module");

const net = require('net');

const options = {
    port: 4567,
    host: "localhost"
};

const clientSocket = net.connect(options);

clientSocket.on("connect", function(){
    console.log("Client connected successfully");
})