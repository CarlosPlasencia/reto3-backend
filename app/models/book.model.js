var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
    name: String,
    author: String,
    date_give: Date,
    pages: Number,
    date_return: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);