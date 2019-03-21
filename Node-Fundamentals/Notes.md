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