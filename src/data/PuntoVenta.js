const { Schema, model } = require('mongoose');

const puntoVentaSchema = new Schema({
    administrador: {
        type: String,
        required: true
    },
    encargadoInventario: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    }
});

module.exports = model('PuntoVenta', puntoVentaSchema);