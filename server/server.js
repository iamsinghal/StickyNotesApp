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




app.get('/fetchNotes/:startFrom/:limit/:order', function(req, res){
    var note = [];
    var limit = req.params.limit
    var start = req.params.startFrom
    var order = req.params.order
    session
        .run(`Match(n:Note) Where n.id >= ${start} RETURN n as note ORDER BY (n.id) ${order} LIMIT ${limit}`,{start, order, limit})
        .then(result =>{
            result.records.forEach(element => {
                note.push(element._fields[0].properties);
            });
      
            session.close();
            
        return res.json(note);
        
        })
        .catch(console.log("It failed"));

    

})

app.post('/addNote', function(req, res){

    var title = req.body.title;
    var content = req.body.content;
    var id = req.body.id;
    
    var query = `Create(n:Note{title:{title}, content : {content} , id : {id}})`;
    session
        .run(query,{title, content, id})
        .then(result =>{
           console.log("Successfully added into db");
       
           return res.send("Success");
        
        })
        .catch(console.log("It failed"));

        session.close()
})

app.post('/updateNote', function(req, res){

    var title = req.body.title;
    var content = req.body.content;
    var id = req.body.id;
    
    var query = `Match(n:Note{id:{id}}) Set n.title = {title} Set n.content = {content}`;
    session
        .run(query,{id, title, content})
        .then(result =>{
           console.log("Successfully added into db");
       
           return res.send("Success");
        
        })  
        .catch(console.log("It failed"));

        session.close()
})

app.delete('/deleteNote', function(req, res){
    var id = req.body;
    var query =`Match(n:Note{id:{id}}) Detach Delete n`;

    session
    .run(query, id)
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
app.listen(80,function(){
    console.log("Started listening on port", 80);
})