const { Schema, model } = require('mongoose');

const compraSchema = new Schema({
    maquina: {
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
    },
    motor: {
        type: Boolean,
        required: true
    },
    botones: {
        type: Boolean,
        required: true
    },
    pintura: {
        type: Boolean,
        required: true
    },
    desgastada: {
        type: Boolean,
        required: true
    }
});

module.exports = model('Compra', compraSchema);