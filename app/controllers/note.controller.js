// Este modulo es el controlador de nuestra aplicación
var Note = require('../models/note.model.js');

function create(req, res) {
    // Crea y guarda una nota en la BD
    if(!req.body.content) {
        res.status(400).send({message: "La nota no puede estar vacia"});
    }

    var note = new Note({title: req.body.title || "Untitled Note", content: req.body.content});

    note.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Ha ocurrido un error al guardar la nota."});
        } else {
            res.send(data);
        }
    });
};

function findAll(req, res) {
    // Encuentra y retorna todas las notas de la base de datos
    Note.find(function(err, notes){
        if(err) {
            res.status(500).send({message: "Ha ocurrido un error al obtener las notas"});
        } else {
            res.send(notes);
        }
    });
};

function findOne(req, res) {
    // Encuentra una nota con el noteId
    Note.findById(req.params.noteId, function(err, data) {
        if(err) {
            res.status(500).send({message: "no se ha podido obtener la nota con id " + req.params.noteId});
        } else {
            res.send(data);
        }
    });
};

function update(req, res) {
    // Actualiza una nota identificada con el noteId en el request
    Note.findById(req.params.noteId, function(err, note) {
        if(err) {
            res.status(500).send({message: "No se pudo encontrar una nota con id " + req.params.noteId});
        }

        note.title = req.body.title;
        note.content = req.body.content;

        note.save(function(err, data){
            if(err) {
                res.status(500).send({message: "No se pudo actualizar la nota con id " + req.params.noteId});
            } else {
                res.send(data);
            }
        });
    });
};

function deleteNote(req, res) {
    // Delete a note with the specified noteId in the request
    // Elimina una nota con el ID noteId especificado en el request
    Note.remove({_id: req.params.noteId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "No se puede eliminar la nota con id " + req.params.id});
        } else {
            res.send({message: "La nota ha sido eliminada exitosamente"})
        }
    });
};

module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteNote
};
