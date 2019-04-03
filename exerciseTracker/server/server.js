var http = require("http")

var express = require("express")

var bodyParser = require("body-parser")

var path = require('path');

const mongoCient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:admin@fcc-cluster-kuacf.mongodb.net/NewDBFCC?retryWrites=true";
let collection = null;
mongoCient.connect(url, function(err, client){
    if(err)
        throw err;
    const db = client.db('NewDBFCC');
    collection = db.collection('ExerciseTrackerCollection');
    collection.remove({});
});

const app = express()
        .use(bodyParser.urlencoded({
            extended: true
        }))

app.get('/', function(req, res){
    //https://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
    res.render(path.resolve(__dirname + "/../client/homePage.ejs"));
})

app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname + "/../client/")));

http.createServer(app).listen(3000)