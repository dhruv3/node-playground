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

// //Connecting to online Database
// //https://stackoverflow.com/a/47662979
// const mongoCient1 = require('mongodb').MongoClient;
// //get the url from Mongo Atlas
// //add the password for `admin`
// //change db from test to whatever you've named your db
// const url = "mongodb+srv://admin:admin@fcc-cluster-kuacf.mongodb.net/NewDBFCC?retryWrites=true";
// mongoCient1.connect(url, function(err, client){
//     if(err)
//         throw err;
//     console.log("database created");
//     const db = client.db('NewDBFCC');
//     db.collection('NewCollectionFCC').insertOne({name: 'Roger'}, (err, result) => {

//     })
// });