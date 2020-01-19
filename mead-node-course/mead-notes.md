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
* fs function encountered: `fs.writeFileSync('fileName', data)` and `fs.readFileSync('fileName')`
* In `writeFileSync` make sure you write a string as the data.
* In `readFileSync` you get a buffer. Use `toString` to make human readable.
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
# Section 4: File System and Command Line Args(Note Apps)
## Getting inputs from User
* `process.argv`: You get an array of arguments you entered in your command line.
* Use a npm package **yargs** to parse argv you receive when you run node command.
* `yargs.version("1.1.0")` this will set your app version number.
* `yargs.command` it takes an object with keys: `command`, `describe`, `handler`, `builder`
* Using `builder` we can create options for the command. Like flags which user needs to enter to get stuff running.
```nodejs
yargs.command({
    command: "add",
    describe: "Add a note",
    builder:{
        title:{
            describe: "Note Title",
            demandOption: true,
            type: "string"
        },
        body:{
            describe: "Note Body",
            demandOption: true,
            type: "string"
        }
    },
    handler: function(argv){
        console.log("Adding a new note")
        console.log("Title: " + argv.title + "\tBody: " + argv.body);
    }
})
```
## Storing data with JSON
* Keys have to be string in JSON.
* `JSON.stringify(some object)` this will create a string of whatever JS object was present.
* `JSON.parse(some string)` this will convert JSON obj to an object.
