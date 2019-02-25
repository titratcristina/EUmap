var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    bodyParser = require('body-parser'),
    io = require('socket.io')(server),
    mongoose = require('mongoose');

//realizarea conexiunii la baza de date
mongoose.connect("mongodb://localhost/mapEU").then(
    () => {
        console.log('Connected to mongodb')
    },
    err => {
        console.log(err);
    }
);

// schema de baza pentru presidency
var schemePresidency = new mongoose.Schema({
    img: 'string',
    name: 'string',
    date: 'string',
    motto: 'string',
    link: 'string',
    reviews: 'array',
    likes: 'Number'
});

var schemeCity = new mongoose.Schema({
    name: 'string',
    county: 'string',
    details: 'string',
    image: 'string',
    panorama: 'string'
});


// model facut pe baza schemei
var presidency = mongoose.model('Presidency', schemePresidency, 'Presidency');

var city = mongoose.model('City', schemeCity, 'City');


// se încarcă folderul cu resurse
app.use('/lib', express.static('lib'));

// afișarea paginii principale
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/view/index.html');
});

// afișarea paginii pentru Raspberry
app.get('/screen', function (req, res) {
    res.sendFile(__dirname + '/app/view/screen.html');
});

// inițializare middleware pentru preluare parametrii POST din request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// returnarea informațiilor - API
app.get('/presidency', function (req, res) {
    presidency.find({}, function (err, results) {
        res.send(results);
    });
});

app.get('/city', function (req, res) {
    city.find({}, function (err, results) {
        res.send(results);
    });
});

// adaugarea review
app.post('/addReview', function (req, res) {
    var presidencyId = req.body.id,
        name = req.body.userName,
        text = req.body.content,
        rating = req.body.rating,
        build = 'reviews'; // pentru crearea etichetei json
    console.log(presidencyId);
    presidency.update({ // filtrează presidency după ID
            "_id": presidencyId
        }, { // adaugă în array
            "$push": {
                [build]: // nume variabil json, creat după indexul respectivului departament
                {
                    "name": name,
                    "content": text,
                    "rating": rating,
                    "time": Date.now()
                }
            }
        },
        function (err, raw) {
            if (err) {
                res.send(err); // răspunsul în cazul unei erori
                console.log('Error while adding')
            }
            res.send(raw); // răspuns
            io.emit('update', { // emite informare actualizare
                for: 'everyone'
            });
            console.log('Added review');
        }
    )
});

// adăugare like
app.post('/like', function (req, res) {
    var presidencyId = req.body.id; // memorează id-ul președinției
    presidency.update({
            "_id": presidencyId
        }, {
            "$inc": {
                "likes": 1 // se incrementează cu 1 
            }
        },
        function (err, raw) {
            if (err) {
                res.send(err); // răspunsul în cazul unei erori
                console.log('Error while liking')
            }
            res.send(raw); // răspuns
            io.emit('update', { // emite informare actualizare
                for: 'everyone'
            });
            console.log('Added like');
        })
});

app.post('/dislike', function (req, res) {
    var presidencyId = req.body.id; // memorează id-ul președinției
    presidency.update({
            "_id": presidencyId
        }, {
            "$inc": {
                "likes": -1 // se incrementează cu -1
            }
        },
        function (err, raw) {
            if (err) {
                res.send(err); // răspunsul în cazul unei erori
                console.log('Error while disliking')
            }
            res.send(raw); // răspuns
            io.emit('update', { // emite informare actualizare
                for: 'everyone'
            });
            console.log('Remove like');
        })
});

// acceptă clienți pe socket pentru informarea în momentul actualizării
io.on('connection', function (socket) {
    io.emit('user_connected', { // emite informare utilizator connectat
        for: 'everyone'
    });
});

server.listen(8000, function () {
    console.log('App listening on port 8000...');
});
