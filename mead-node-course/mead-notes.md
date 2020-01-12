# Section 2: Installing and Exploring Node
* With Nodejs you could do create CLI, access files and build webservers. So you could run JS code on server with Node.
* Node and Chrome browser same engine - V8(Google OSS)
* JS Engine, like V8, take your JS and turn it into machine code. 
* Node and Chrome are written in Cpp. V8 is in Cpp. Node and Chrome integrate with V8 and enhance V8 ability. Which means that they make JS do things it could not do before.
* Node and Chrome are just creating their own modified version of JS.
* Eg- Chrome runtime adds click event and DOM manipulation ability to JS.
* Eg- Node runtime provides libs using which you can setup webservers and integrate with file system so that you can read and write from disk.

# Section 3: Node.js Module System
* The module system lets you load external libraries into your application. That’ll enable you to take advantage of built-in Node.js modules as well as third-party npm modules.
## Importing in-built core module
* Importing `fs` module:
  ```nodejs
  const fs = require('fs');
  ```
## Importing your own files
* All of your files, which are referred as modules, have their own scope.
* You can export stuff from your module as follows:  
  ```nodejs
  const name = 'Mike';
  module.exports = name
  ```
* Also when you `require('./util.js')` it will get executed.
## Importing npm modules
* It involves two steps: initialize npm and install npm modules we need to use.
* Initialize npm: `npm init`
* Install module as `npm i validator@10.8.0`. When you run it creates two things:
  * node_module folder: maintained by npm. it has all the required dependecy.
  * package-lock.json: This file makes npm faster and more secure.
* Import using following command:
```nodejs
const validator = require('validator')
```
* Local dependency are those installed in your package.json. Other option is global package installation for packages lie nodemon. 
