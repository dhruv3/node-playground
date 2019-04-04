var http = require("http")

var express = require("express")

var bodyParser = require("body-parser")

var path = require('path');

const mongoCient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:admin@fcc-cluster-kuacf.mongodb.net/NewDBFCC?retryWrites=true";
let userCollection = null;
let userRecordCollection = null;
mongoCient.connect(url, function(err, client){
    if(err)
        throw err;
    const db = client.db('NewDBFCC');
    userCollection = db.collection('userExTrackerCollection');
    userCollection.remove({});
    userRecordCollection = db.collection('userRecordExTrackerCollection');
    userRecordCollection.remove({});
});

const app = express()
        .use(bodyParser.urlencoded({
            extended: true
        }))

app.get('/', function(req, res){
    //https://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
    res.render(path.resolve(__dirname + "/../client/homePage.ejs"));
})

app.post('/api/exercise/new-user', function(req,res){
    const newUserID = req.body.newUser;
    userCollection.update(
        { userID: newUserID },
        { upsert: true }
    ).then(function(data){
        //update success message
        if(data.result.upserted != undefined && data.result.nModified == 0){
            res.end("New user '" + req.body.newUser + "' added!");
        }
        //update failed as it exists
        else{
            res.end("Username '" + req.body.newUser + "' already taken. Please try new one!");
        }
    })
})

app.post('/api/exercise/add', function(req, res){

})

app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname + "/../client/")));

http.createServer(app).listen(3000)