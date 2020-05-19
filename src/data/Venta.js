const { Schema, model } = require('mongoose');

const ventaSchema = new Schema({
    factura: {
        type: String,
        required: true
    },
    cliente: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    ubicacion: {
        type: String,
        required: true
    }
});

module.exports = model('Venta', ventaSchema);