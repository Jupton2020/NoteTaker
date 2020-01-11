// dependecies
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT ||3000;

// sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



//routes
app.get("/",function(req,res) {  
    res.sendFile(path.join(__dirname,"./public/index.html"));
});

app.get("/notes",function(req,res) {    
    res.sendFile(path.join(__dirname,"./public/notes.html"));
});

app.get("/api/notes",function(req,res){ 
     fs.readFile("./db/db.json","utf8",(err,data) =>{   
         if(err) throw err;
         console.log(data);
     res.json(JSON.parse(data));
    });
});



//recieve a new note to save on the request body, add it to the db.json file 
// and then return the new note to the client.
app.post("/api/notes",function (req,res){   
   fs.readFile('./db/db.json','utf8',(err,data) => {    
       if (err) throw err;
       let temp = JSON.parse(data);
       console.log(temp)
       temp.push(req.body)
       fs.writeFile("./db/db.json",JSON.stringify(temp),(err) => { 
           if (err) throw err;
           res.json('The file has been saved')
        })
    });
});



//When the trashcan icon is clicked..
//deletes the targeted note by the object's id in the db json file after a user deletes a note 
app.delete("/api/notes/:id",function(req,res){ 
fs.readFile('./db/db.json','utf8',(err,data) => { 
    if (err) throw err;
    let temp = JSON.parse(data);
    temp.splice(req.params.id, 1)
    fs.writeFile("./db/db.json",JSON.stringify(temp),(err) =>{ 
        if (err) throw err;
        res.json('The file has been removed')
     })
  })
});

app.post("/api/clear",function(req,res){    
    db.length = 0;
})

//starts the server to beging listening 
app.listen(PORT,function (){    
    console.log("App listening on PORT" + PORT);
});

