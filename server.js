var express = require('express');
var bodyParser = require('body-parser');

// Creamos nuestra app de express
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// importamos la configuracion de nuestra BD
var mongoose = require('mongoose');
var dbConfig = require('./config/database.config.js');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
	useMongoClient: true
});

mongoose.connection.on('error', function() {
    console.log('No se ha podido conectar a la BD, Saliendo...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Conectado exitosamente a la BD!");
});

app.use(express.static('public'));

// define a simple route
app.get('/', function(req, res){
    res.sendFile(__dirname + "/" + "index.html");
});

var notes = require('./app/controllers/note.controller');

// Creamos una nueva nota
app.post('/notes', notes.create);

// Obtenemos todas las notas
app.get('/notes', notes.findAll);

// encuentra una nota con el noteId
app.get('/notes/:noteId', notes.findOne);

// Actualiza una nota con el noteId
app.put('/notes/:noteId', notes.update);

// Elimina una nota con el noteId
app.delete('/notes/:noteId', notes.deleteNote);

app.listen(3000, function(){
    console.log('El servidor web esta corriendo en el puerto 3000...!')
});