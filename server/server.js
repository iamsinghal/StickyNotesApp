var express = require("express");
var path = require("path");
var neo4j = require("neo4j-driver").v1;
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
var driver = neo4j.driver('bolt://hobby-ohpkgicnhajogbkecbepjoal.dbs.graphenedb.com:24786', neo4j.auth.basic('neo4j', 'b.7iYjP3cMs7RY.BgHso9PrkRAOOPP9'));

var session = driver.session();

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

app.get('/getNotes', function (req, res) {
    var note = [];
    session
        .run('Match(n:Note) RETURN n as note')
        .then(result => {
            result
                .records
                .forEach(element => {
                    note.push(element._fields[0].properties);
                });
            return res.json(note);

        })
        .catch(console.log("It failed"));

    session.close();
})

app.get('/note/getId', function (req, res) {
    var note = [];
    session
        .run('Match(n:Note) Return n as note Order By n.id desc limit 1')
        .then(result => {
            result
                .records
                .forEach(element => {
                    note.push(element._fields[0].properties);
                });
            return res.json(note);
        })
        .catch(console.log("It failed"));
    session.close();
})

app.get('/note/:limit/:startFrom/:order', function (req, res) {
    var note = [];
    var limit = req.params.limit
    var start = req.params.startFrom
    var order = req.params.order
    session
        .run(`Match(n:Note) Where n.id >= ${start} RETURN n as note ORDER BY (n.id) ${order} LIMIT ${limit}`, {start, order, limit})
        .then(result => {
            result
                .records
                .forEach(element => {
                    note.push(element._fields[0].properties);
                });

            session.close();
            return res.json(note);
        })
        .catch(console.log("It failed"));

})

app.post('/note/add', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var id = req.body.id;
    var query = `Create(n:Note{title:{title}, content : {content} , id : {id}})`;
    session
        .run(query, {title, content, id})
        .then(result => {
            console.log("Successfully added into db");
            return res.send("Success");
        })
        .catch(console.log("It failed"));
    session.close();
})

app.put('/note/:id', function (req, res) {

    var title = req.body.title;
    var content = req.body.content;
    var noteId = req.params.id;
    var query = `Match(n:Note{id:${noteId}}) Set n.title = {title} Set n.content = {content}`;
    session
        .run(query, {noteId, title, content})
        .then(result => {
            console.log("Successfully updated into db");
            return res.send("Success");
        })
        .catch(console.log("It failed"));

    session.close()
})

app.delete('/note/:id', function (req, res) {
    var noteId = req.params.id;
    var query = `Match(n:Note{id:${noteId}}) Detach Delete n`;
    session
        .run(query, {noteId})
        .then(result => {
            console.log("Deleted...");
            return res.send("Deleted");
        })
        .catch(console.log("It failed"));
    session.close();

});

app.use(express.static(path.join(__dirname, "../client/build")));
app.listen(process.env.PORT || 9000, function () {
    console.log("Started listening on port", 9000);
})