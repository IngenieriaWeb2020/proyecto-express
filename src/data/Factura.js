const { Schema, model } = require('mongoose');

const facturaSchema = new Schema({
    fecha: {
        type: Date,
        default: Date.now()
    },
    maquina: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

module.exports = model('Factura', facturaSchema);