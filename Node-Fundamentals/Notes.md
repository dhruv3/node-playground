# Node.js Fundamentals
## Node.js Syntax
* You can use keywords like `global`, `process`, `require`, `module` in node environment.
* To debug node app from text editor you need to run `node --debug app.js`.
* `exports` stuff from your module.
```js
exports.fName = "Seth";
```
* `require` your module as follows:
```js
var myModule = require('./sample_module'); 
```
* Export one single entity as shown below:
```js
modules.exports = function(){} 
```
* Core module in Node are `os`, `http`.
* Node caching can cause issue. Module gets cached when its imported. Reimporting the module again in the same file will not fetch the latest changes.
* `npm prune` removes dependencies not present in package.json.
## Basic Web Server
```js
http.createServer(requestListener);
```
* requestListener: Specifies a function to be executed every time the server gets a request. This function handles request from the user, as well as response back to the user.

* `connect`: Connect is an extensible HTTP server framework for node using "plugins" known as middleware. Connect is a simple framework to glue together various "middleware" to handle requests. 
* `body-parser`: Node.js body parsing middleware.
* `request`: Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
* Sending Responses: Get url from request as `req.url` and send responses using `res.end`.
* **Creating a GET request from client** you use request module.
```js
request('http://localhost:3000/hello', function(err, response, body){
    //add content
}).pipe(fs.createWriteStream("./DemoData/pipeFile.txt"))
```
* `pipe` allows you to write content received as response from server.
* Another way to call GET request:
```js
request(options, callback);
```
* **Creating a POST request from client** do as follows:
```js
var data = {
    userFirstName: "John",
    userLastName: "Cena"
}

//Syntax 1:
//request.post('http://localhost:3000/').form(data);
//Syntax 2:
//request.post('http://localhost:3000/',{form: data});
//Syntax 3:
request.post('http://localhost:3000/',{form: data}, callback);
```
* **Managing Events**: The core `http` module supports ability to handle events like `request`(which is emitted wheenver any request is received by server) and `upgrade`(when= we want to change the communication from http to websocket. WS is more secure and efficient way to communicate). To launch the `upgrade` event you need to contact the server using websocket way of communication.
* **Serve Static Files**: Use `serve-static` module and you can get static file if you go to urls like `localhost:3000/eggs.jpg`. Write code as follows:
```js
var app = connect().use(serveStatic('myPublicFolder'))
```
* **URL module**: This is a core node module which can be used to parse urls and also create a http url. Code:
```js
var parsedUrlObject = url.parse(someUrl, true);

var urlString = url.format(parsedUrlObject);
```
* **queryString module**: It takes an object and generates a string which can be appended at the end of url. You can then make a request to that url. Example:
```js
var queryDataObject = {
    "resourceId": 1,
    "uName": "John"
}
var stringFromObject = queryString.stringify(queryDataObject)
```
## Connecting to MongoDB
* Start `mongodb` server. By default it listens on port 27017.
* Next run `npm install mongodb`. This is the driver which helps us communicate between Mongo and Node.
```js
const mongoCient1 = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydatabase";

mongoCient1.connect(url, function(err, db){
    if(err)
        throw err;
    console.log("database created");
    db.close();
});
```
