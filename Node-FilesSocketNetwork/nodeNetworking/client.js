console.log("Creating a TCP client using NET module");

const net = require('net');

const options = {
    port: 4567,
    host: "localhost"
};

const clientSocket = net.connect(options);

clientSocket.on("connect", function(){
    console.log("Client connected successfully");
    const message= "This is my message to the server.";
    let dataSent = clientSocket.write(message, 'utf-8', function(){
        console.log("Data sent to server");
        console.log("Data sent to server: " + clientSocket.bytesWritten);
    })
    //check if the buffer is completely empty
    clientSocket.on('drain', function(){
        console.log("Buffer is completely empty");
    })
    //setup TCP client to receive data from server
    clientSocket.on('data', function(data){
        console.log("Data received from server: " + data);
        //prop below tells how many bytes read from the client
        console.log("Data read from server: " + clientSocket.bytesRead);
    })
})