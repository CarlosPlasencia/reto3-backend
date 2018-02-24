// Este modulo es el controlador de nuestra aplicación
var Book = require('../models/book.model.js');

const create = (req, res) => {
    // Crea y guarda una libro en la BD
    const { name, author } = req.body
    if(!name || !author ) {
        return res.status(400).send({message: "El nombre y el autor son requeridos"})
    }
    var book = new Book(req.body)
    book.save((err, data)=>{
        if(err) {
            console.log(err);
            return res.status(500).send({message: "Ha ocurrido un error al guardar el libro."});
        } else {
            return res.send(data);
        }
    })
};

const findAll = async(req, res) => {
    // Encuentra y retorna todas las notas de la base de datos
    try {
        const books = await Book.find()
        if(!books.length) return res.status(500).send({message: "No hay libros guardados."})
        return res.send(books)
    } catch (error) {
        return res.status(500).send({message: "Ha ocurrido un error al obtener los libros"});
    }
}

const findOne = async(req, res) =>{
    // Encuentra una libro con el bookId
    try {
        const book = await Book.findOne({_id: req.params.bookId })
        if(!book) return res.status(500).send({message: "no se ha podido obtener el libro con id " + req.params.bookId})
        return res.send(book)
    } catch (error) {
        return res.status(500).send({message: "error al obtener el libro con id " + req.params.bookId});
    }
};

const update = async (req, res) => {
    // Actualiza una libro identificada con el bookId en el request
    try {
        const book = await Book.findOne({_id: req.params.bookId })
        if(!book) return res.status(500).send({message: "no se ha podido obtener el libro con id " + req.params.bookId})
        book.name = req.body.name ? req.body.name : book.name
        book.author = req.body.author ? req.body.author : book.author
        book.date_give = req.body.date_give ? req.body.date_give : book.date_give
        book.date_return = req.body.date_return ? req.body.date_return : book.date_return
        book.pages = req.body.pages ? req.body.pages : book.pages
        book.save((err, data)=>{
            if(err) {
                res.status(500).send({message: "No se pudo actualizar el libro con id " + req.params.bookId});
            } else {
                res.send(data);
            }
        });
    } catch (error) {
        res.status(500).send({message: "No se pudo actualizar el libro con id " + req.params.bookId});
    }
}

const deleteNote = async (req, res)=> {
    // Delete a book with the specified bookId in the request
    // Elimina una libro con el ID bookId especificado en el request
    Book.remove({_id: req.params.bookId}, (err, data)=> {
        if(err) {
            res.status(500).send({message: "No se puede eliminar el libro con id " + req.params.bookId});
        } else {
            res.send({message: "El libro ha sido eliminada exitosamente"})
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
