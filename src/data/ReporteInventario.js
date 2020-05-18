const { Schema, model } = require('mongoose');

const reporteSchema = new Schema({
    ubicacion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    totalMaquinas: {
        type: Number,
        required: true
    },
    maquinasNuevas: {
        type: Number,
        required: true
    },
    maquinasSegunda: {
        type: Number,
        required: true
    }
});

module.exports = model('ReporteInventario', reporteSchema);