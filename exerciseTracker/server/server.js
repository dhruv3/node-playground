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

//https://ciphertrick.com/2016/06/12/avoiding-callback-hell-node-js/
app.post('/api/exercise/new-user', function(req,res){
    const newUserID = req.body.newUser;
    //need to use $set in order insert
    //https://stackoverflow.com/questions/13814539/mongodb-update-with-upserttrue-does-not-act-as-in-insert
    userCollection.update(
        { userID: newUserID },
        {"$set": {"userID": newUserID}},
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
    const exerciseObj = {
        "userId": req.body.userId,
        "desc": req.body.desc,
        "duration": req.body.duration,
        "date": req.body.date
    }
    //https://stackoverflow.com/questions/31088663/node-js-mongodb-db-collection-find-not-working-while-collection-insert-works
    //if userID exists
    userCollection.findOne(
        {userID: exerciseObj["userId"]}
        ).then(function(data){
            //if userID doesn't exist
            if(data == null){
                res.end("User does not exist.")
            }
            //validate date
            else{
                //if date is older than current date. send error.
                const currDate =  new Date();
                const inpDate = new Date(exerciseObj["date"]);
                if(inpDate < currDate){
                    res.end("Incorrect date. Please select todays date or future date.");
                }
                //insert into collection
                else{
                    userRecordCollection.insertOne(exerciseObj)
                        .then(function(data){
                            res.json(exerciseObj);
                        })
                }
            }
        })
        
})

app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname + "/../client/")));

http.createServer(app).listen(3000)