# FreeCodeCamp
## Managing Packages with npm
### Introduction
* When starting a new project, npm generates a `package.json` file. This file lists the package dependencies for your project.
* npm saves packages in a folder named `nodemodules`. These packages can be installed in two ways:
  * **globally** in a root `nodemodules` folder, accessible by all projects.
  * **locally** within a project's own `nodemodules` folder, accessible only to that project.

### Add Keywords to Your package.json
```js
"keywords": [ "descriptive", "related", "words" ],
```
The keywords-field is where you can describe your project using related keywords.

### Expand Your Project with External Packages from npm
* Package Manager ensure dependency management.
* npm automatically installs all the required dependencies.
* In the dependencies-section, packages your project require are stored using the following format:
```js
"dependencies": {
  "package-name": "version",
  "express": "4.14.0"
}
```

### Semantic Versioning
* Semantic Versioning (SemVer) is an industry standard for software versioning aiming to make it easier to manage dependencies.
* This is how Semantic Versioning works according to the official website:

  Given a version number MAJOR.MINOR.PATCH, increment the:
  * MAJOR version when you make incompatible API changes,
  * MINOR version when you add functionality in a backwards-compatible manner, and
  * PATCH version when you make backwards-compatible bug fixes.
  
  This means that PATCHes are bug fixes and MINORs add new features but neither of them break what worked before. Finally, MAJORs add changes that won’t work with earlier versions.

### Tilde-Character Patch Version
* To allow a npm dependency to get updated to the latest PATCH-version, you can prefix the dependency’s version with the tilde-character (~). 
```js
"some-package-name": "~1.3.8" allows updates to any 1.3.x version.
```

### Caret-Character Patch Version
* Caret allows both MINOR and PATCHes update.
```js
"some-package-name": "^1.3.8" allows updates to any `1.x.x` version.
```

## Basic Node and Express
### Introduction
* Core node modules are listed below:
  * HTTP: a module that acts as a server
  * File System: a module that reads and modifies files
  * Path: a module for working with directory and file paths
  * Assertion Testing: a module that checks code against prescribed constraints
* Express runs between the server created by Node.js and the frontend pages of a web application. 
* Express also handles an application's routing. Routing directs users to the correct page based on their interaction with the application.

### Start a Working Express Server
* Creating Express object:
```js
var express = require('express');
var app = express();
```
* Tells your server to listen on a given port, putting it in running state. 
```js
app.listen(port)
```

* Taking routes and methods:
```js
app.METHOD(PATH, HANDLER)
```
  * METHOD is an http method in lowercase.
  * PATH is a relative path on the server (it can be a string, or even a regular expression). 
  * HANDLER is a function that Express calls when the route is matched.

Example:
```js
app.get('/', function(req, res) {
res.send('Hello Express');
})
```
### Serve an HTML File
* We can respond with a file using the method `res.sendFile(path)`.
* Behind the scenes this method will set the appropriate headers to instruct your browser on how to handle the file you want to send, according to its type. Then it will read and send the file. 
* This method needs an absolute file path as shown below:
```js
 absolutePath = __dirname + relativePath/file.ext
 ```
 * **NOTE:** Express evaluates the routes from top to bottom. It executes the handler for the first match.
 
 ### Serve Static Assets
 * In Express you can place static assets using the middleware:
 ```js
 express.static(path)
 ```
* Middlewares are functions that intercept route handlers, adding some kind of information. 
* A middleware needs to be mounted using the method `app.use(path, middlewareFunction)`. 
* The first path argument is optional. If you don’t pass it, the middleware will be executed for all the requests.
```js
app.use(express.static(__dirname + "/public"))
```
### Serve JSON on a Specific Route
* HTML server serves HTML. API serves data.
* A REST API allows data exchange in a simple way, without the need for clients to know any detail about the server. 
* The client only needs to know where the resource is (the URL), and the action it wants to perform on it (the verb).
* Use the method `res.json()`, passing in an object as an argument. This method closes the request-response loop, returning the data. 
### Use the .env File
* The `.env` file(it is a shell file) is a hidden file that is used to pass environment variables to your application. 
* This file is secret, no one but you can access it, and it can be used to store data that you want to keep private or hidden.
* You can access env var using `process.env.VAR_NAME`.
* The `process.env` object is a global Node object, and variables are passed as strings.
