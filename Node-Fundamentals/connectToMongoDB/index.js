const mongoCient1 = require('mongodb').MongoClient;
//we using mongodb protocol
//next is the port where mongo is listening
//mydatabsse is the name of the db we have created
const url = "mongodb://localhost:27017/mydatabase";

mongoCient1.connect(url, function(err, db){
    if(err)
        throw err;
    console.log("database created");
    db.close();
});