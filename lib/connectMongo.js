'use strict';

const mongoose = require('mongoose');
const connect = mongoose.connection;

connect.on('open', () => {
    console.log('Estamos conectado con MongoDB en', connect.name)
});

connect.on('error', err => {
    console.error('Error de conexion', err);
    process.exit(1);
});

mongoose.connect('mongodb://127.0.0.1:27017/practica', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connect;