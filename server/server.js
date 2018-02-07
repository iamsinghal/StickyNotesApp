var express = require("express");
var path = require("path");
var neo4j = require("neo4j-driver").v1;
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j','neo4j'));

var session =  driver.session();


app.get('/api',function(req,res){

    res.send({express :'Hello from Express'});
})

    

app.get('/getNotes', function(req, res){
    var note = [];
    
    session
        .run('Match(n:Note) RETURN n as note')
        .then(result =>{
            result.records.forEach(element => {
                note.push(element._fields[0].properties);
            });
        return res.json(note);
        
        })
        .catch(console.log("It failed"));

        session.close();
})

app.post('/addNote', function(req, res){
    var note = [];
    var name = req.body.name;
    var tagline = req.body.tagline;
    
    var query = `Create(n:Note{title:{name}, content : {tagline}})`;
    session
        .run(query,{name,tagline})
        .then(result =>{
           console.log("Successfully added into db");
       
           return res.send("Success");
        
        })
        .catch(console.log("It failed"));

        session.close()
})

app.delete('/deleteNote', function(req, res){
    var name = req.body.name;
    var query =`Match(n:Note{title:{name}}) Detach Delete n`;

    session
    .run(query, {name})
    .then( result =>{
        console.log("Deleted...");
        return res.send("Deleted");
    })
    .catch(
        console.log("It failed")
    );

    session.close();
    
});

// app.use(express.static(path.join(__dirname,"../app/dist")));
app.listen(8888,function(){
    console.log("Started listening on port", 8888);
})