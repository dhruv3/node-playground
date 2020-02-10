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

## Arrow Function
* Arrow functions don't create their own `this` binding but you use the context in which they are created.
* ES6 method definition syntax:
```js
# OLD WAY
const obj = {
  foo: function() {
    // ...
  },
  bar: function() {
    // ...
  }
}

# NEW WAY
const obj = {
  foo() {
    // ...
  },
  bar() {
    // ...
  }
}
```
# Section 5: Debugging
* Use `node inspect` to debug and break execution of your node program.
* Go to `chrome://inspect` to see your app breakpoint. Click `inspect` next to see your app at the breakpoint.
* Select this option: `Add folder to workspace` to get your files in the source.

# Section 6: Async Node.js(Weather App)
* `setTimeout` is not in JS or V8 enginer. NodeJS created the defintion for this. So when you call `setTimeout` it will be registered in Node APIs. Node will start the timer and then call the "callback" registered in `setTimeout`.
* JS is a single-thread programming language. Node uses more than one thread to manage other functions. This is why NODE is non-blocking.
* **Call Stack**: Where the functions get run.
* **Callback Queue**: Where callbacks are placed. You need to move function from here to Call Stack in order to execute it.
* So none of the async functions get run before your **main** function is DONE.
* If your function is using callback pattern it is not necessary that it is a ASYNC in nature. Example: **foreach**, **filter** method.
* Use `npm init -y` to say yes to all the default questions in your package.json
* `request` package to make http requests.
* To get a response in **json** format you need to make request as follows:
```js
request({url: mapBox, json: true}, (error, response) => {
    const lat = response.body.features[0].center[0]
    const long = response.body.features[0].center[1]
    console.log(lat, long)
})
```
* `mapbox` api to give you long and lat if you provide name of the location.
* ES6 Property destructuring:
```js
request({url, json: true}, (error, {body}) => {
        
    })
```
* ES6 Object Destructuring: `{repsonse}` instead of `(data)` and then picking doing `data.response`

# Section 7: Web Servers
* You can use `send` to serve JSON and HTML as response.
```js
res.send("<h1>Header</h1>");

res.send({
name: "JAHN",
champ: 16
});
```
* Node in-built variables: `__dirname` and `filename`.
* Use core node modules `path` to manipulate file paths.
```js
const path = require('path')
path.join(__dirname, "../public")
```
* To serve all the content of a directory:
```js
app.use(express.static(myPath))
```
* `index.html` works as your root path in Express.
## Using Template Engine to render Dynamic WebPages
* `Handlebars` is used for Dynamic WebPages and creating reusable markups.
* Use npm package **hbs** to setup Handlebars that is wrapped with Express.
```js
app.set('view engine', 'hbs')
```
* This tells Express we are using hbs as our templating engine.
* Handlebars wants a folder called `views` in your project dir.
```js
app.get('', (req, res) => {
    res.render('index');
})
```
* So calling `render` makes Node go get the view from `views` folder
