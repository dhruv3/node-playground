console.log("Navigating Directories");

var fs = require('fs');

fs.readdir('DirectoryA', function(err, files){
    if(err){
        console.log(err);
    }
    else{
        console.log("-----List Directory-----");
        files.forEach(function(file){
            const filePath = 'DirectoryA/' + file;
            fs.stat(filePath, function(error, stats){
                if(error){
                    console.log(error);
                }
                else if(stats){
                    if(stats.isFile()){
                        console.log(file + " is a file")
                    }
                    else if(stats.isDirectory()){
                        console.log(file + " is a directory")
                    }
                }
            })
        })
    }
})

console.log("Removing Directories");

fs.mkdir("DirectoryA/DirectoryNew", function(err){
    if(err)
        console.log(err);
    else
        console.log("Directory Created");
})

fs.rmdir("DirectoryA/DirectoryNew", function(err){
    if(err)
        console.log(err);
    else
        console.log("Directory Removed");
})

console.log("Reading Files");

fs.readFile("DirectoryA/fileA.txt", "utf8", function(err, data){
    if(err){
        console.log(err);
    }
    else{
        console.log(data);
    }
})

console.log("Writing Files");

fs.readFile("DirectoryA/fileA.txt", "utf8", function(err, data){
    if(err){
        console.log(err);
    }
    else{
        console.log(data);
    }
})

console.log("Watching for Directory Changes")

fs.watch("DirectoryA", {persistent: true}, function(event, fileName){
    if(event == "rename"){
        console.log("rename done on " + fileName);
    }
    else if(event == "change"){
        console.log("change done on " + fileName);
    }
})