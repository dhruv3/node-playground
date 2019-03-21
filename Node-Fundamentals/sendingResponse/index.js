var connect = require("connect");
var app = connect()
            .use(function(req, res){
                var url = req.url;
                if(url == "/hello"){
                    res.end("Hello hello how low");
                }
                else if(url == "/hello.json"){
                    var data = "Hello";
                    var jsonData = JSON.stringify(data);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(jsonData);
                }
                else if(url == '/'){
                    res.end("Go to /hello or /hello.json");
                }
                else{
                    res.statusCode = 404;
                    res.end("404 Error. Resource not found")
                }
            })
            .listen(3000)