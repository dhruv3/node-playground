var connect = require('connect');

connect().use(
    function(req, res){
        var url = req.url;
        if(url == "/hello"){
            res.end("Hello hello how low");
        }
        else if(url == "/printRequestHeaders"){
            var headers = req.headers;
            console.log("echoing header");
            console.log(headers);
            res.end("Headers printed in console");
        }
        else{
            res.end("404 Error. Nothing matched")
        }
    }
).listen(3000);