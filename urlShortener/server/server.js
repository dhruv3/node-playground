var http = require("http")

var express = require("express")

var bodyParser = require("body-parser")

var path = require('path');

var dns = require('dns');

const mongoCient1 = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:admin@fcc-cluster-kuacf.mongodb.net/NewDBFCC?retryWrites=true";
let collection = null;
mongoCient1.connect(url, function(err, client){
    if(err)
        throw err;
    const db = client.db('NewDBFCC');
    collection = db.collection('NewCollectionFCC');
    collection.remove({});
});
var counter = 0;
var addRecordToCollection = function(url){
    collection.find({url: url}).toArray(function(err, result) {
        if (err) throw err;
        if(result.length == 0){
            collection.insert({url: url, shortURL: counter});
            counter++;
        }
        else{
            //notify that already present
        }
    });
}

var app = express()
        .use(bodyParser.urlencoded({
            extended: true
        }))
        //handles the http req that come in
        .use(function(req, res){
            const url = req.url;
            if(url == '/'){
                //https://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
                res.sendFile(path.resolve(__dirname + "/../client/index.html"));
            }
            else if(url == '/api/shorturl/new'){
                let targetURL = req.body.url;
                const doubleSlashPos = targetURL.indexOf("//");
                if(doubleSlashPos != -1)
                    targetURL = targetURL.substr(doubleSlashPos + 2);
                //check if legit
                dns.lookup(targetURL, function(err, address, family){
                    if(err != undefined){
                        console.log(err);
                        res.end("Invalid URL");
                    }
                    addRecordToCollection(req.body.url);
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