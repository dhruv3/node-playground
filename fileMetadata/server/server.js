const path = require('path');
const express = require('express');
const http = require("http");
const multer = require('multer');

const app = express()

app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname + "/../client/homePage.html"));
})

//https://github.com/ticachica/ja-filemetadata-ms
app.post('/api/fileanalyze', multer({ dest: './uploads/'}).single('upfile'), function(req,res){
	console.log('{Name: '+ req.file.originalname +' +Size: '+ req.file.size +'}'); 
    const fsize = req.file.size;
    const foriginalname = req.file.originalname;
	res.json({Name: foriginalname, Size: fsize});
});

//https://expressjs.com/en/starter/static-files.html
app.use(express.static(path.resolve(__dirname + "/../client/")));
http.createServer(app).listen(3000)