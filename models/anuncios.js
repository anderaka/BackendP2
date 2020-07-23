'use strict';

const mongoose = require('mongoose');

/*Patron para los elementos de un anuncio*/

const anuncioSchema = mongoose.Schema({
    name: String,
    description: String,
    sell: String,
    price: Number,
    photo: String,
    tags: [String]
});

anuncioSchema.statics.list = function (filter, limit, start, sort) {
    const query = Anuncio.find(filter);
    query.limit(limit);
    query.skip(start);
    query.sort(sort)

    return query.exec();
}

anuncioSchema.statics.tagList = function () {
    const query = Anuncio.distinct('tags');
   
    return query.exec();
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;