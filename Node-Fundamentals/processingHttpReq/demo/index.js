var http = require("http")

var connect = require("connect")

var bodyParser = require("body-parser")

var app = connect()
        .use(bodyParser.urlencoded({
            extended: true
        }))
        //handles the http req that come in
        .use(function(req, res){
            var parsedInfo = {};
            //body prop is present thanks to body-parser
            parsedInfo.firstName = req.body.userFirstName;
            parsedInfo.lastName = req.body.userLastName;
            res.end("User info parsed from form: " + parsedInfo.firstName + " " + parsedInfo.lastName);
        })

http.createServer(app).listen(3000)

console.log("Listening on port 3k")