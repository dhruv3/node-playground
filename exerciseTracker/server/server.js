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
        "userID": req.body.userID,
        "desc": req.body.desc,
        "duration": req.body.duration,
        "date": req.body.date
    }
    //https://stackoverflow.com/questions/31088663/node-js-mongodb-db-collection-find-not-working-while-collection-insert-works
    //if userID exists
    userCollection.findOne(
        {userID: exerciseObj["userID"]}
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

function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    if(Number.isNaN(d.getTime())) return false; // Invalid date
    return d.toISOString().slice(0,10) === dateString;
}

app.get('/api/exercise/log/:userID', function(req, res){
    const user = req.params.userID;
    const fromDate = req.query.from;
    const toDate = req.query.to;
    const limit = req.query.limit; 
    userCollection.findOne(
        {userID: user}
        ).then(function(data){
            //if userID doesn't exist
            if(data == null){
                res.end("User does not exist.")
            }
            else if(Object.keys(req.query).length === 0){
                //print everything
            }
            else{
                console.log(req.query)
                //validate date
                if(isValidDate(fromDate) == false){
                    res.end("Incorrect 'from' date");
                }
                if(isValidDate(toDate) == false){
                    res.end("Incorrect 'to' date");
                }
                if(new Date(fromDate) > new Date(toDate)){
                    res.end("'to' date should be higher than 'from' date")
                }
                if(typeof limit != "number" || limit <= 0){
                    res.end("Incorrect value of limit parameter");
                }
                userRecordCollection.find({ 
                    "userID": user, 
                    "date" : { 
                      $lt: toDate, 
                      $gte: fromDate
                    }   
                }).then(function(res){
                    console.log(res);
                })
            }
        })
})
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname + "/../client/")));

http.createServer(app).listen(3000)