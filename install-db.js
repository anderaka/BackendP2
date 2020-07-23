'use strict';

const connect = require('./lib/connectMongo');
const anuncios = require('./models/anuncios')

connect.once('open', async () => {
    try {

        await initAnuncios();
        console.log("La importacion se realiza correctamente.")
        connect.close();

    } catch (err) {

        console.error('Hubo un error: ', err)
        process.exit(1);

    }

});

/*Inicializamos los anuncios*/ 

async function initAnuncios() {

    await anuncios.deleteMany();
    await anuncios.insertMany([
        { name: 'PS5', sell: 'Vender', price: 499, photo: 'ps5.JPG', tags: ['lifestyle'], description:'Esta es la nueva consola de Sony' },
        { name: 'Cadillac', sell: 'Vender', price: 48000, photo: 'Cadillac.JPG', tags: ['motor'], description:'Este es el coche de tus sueños lo vas a dejas escapar' },
        { name: 'Pesas', sell: 'Vender', price: 150, photo: 'pesas.JPG', tags: ['lifestyle'], description: 'mas fuerte que el vinagre con estas pesas' },
        { name: 'Bicicleta', sell: 'Vender', price: 99, photo: 'bicicleta.JPG', tags: ['lifestyle'], description:'Para comenzar esa vida saludable que tanto ansias'},
        { name: 'Rolls Royce', sell: 'Vender', price: 450500, photo: 'rols.JPG', tags: ['motor'], description:'La definicion de clase hecha coche, una autentica ganga' },
        { name: 'Lenovo Legion', sell: 'Vender', price: 1399, photo: 'lenovo.JPG', tags: ['work'], description:'para el trabajo o para el ocio el mejor portatil del mercado' },
        { name: 'PS4', sell: 'Vender', price: 299, photo: 'ps5.JPG', tags: ['lifestyle'], description:'Se busca ps4 en buenas condiciones'},

    ]);

}