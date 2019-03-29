var http = require("http")

var express = require("express")

var bodyParser = require("body-parser")

var path = require('path');

var dns = require('dns');

var app = express()
        .use(bodyParser.urlencoded({
            extended: true
        }))
        //handles the http req that come in
        .use(function(req, res){
            const url = req.url;
            let targetURL = req.body.url;
            const doubleSlashPos = targetURL.indexOf("//");
            if(doubleSlashPos != -1)
                targetURL = targetURL.substr(doubleSlashPos + 2);
            
            if(url == '/'){
                //https://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
                res.sendFile(path.resolve(__dirname + "/../client/index.html"));
            }
            else if(url == '/api/shorturl/new'){
                //check if legit
                dns.lookup(targetURL, function(err, address, family){
                    if(err != undefined){
                        console.log(err);
                        res.end("Invalid URL");
                    }
                    console.log(address + "\t" + family);
                })
            }
            else{
                var parsedInfo = {};
                //body prop is present thanks to body-parser
                parsedInfo.url = req.body.url;
                res.end("User info parsed from form: " + parsedInfo.url);
            }
        })

http.createServer(app).listen(3000)

console.log("Listening on port 3k")