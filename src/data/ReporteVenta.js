const { Schema, model } = require('mongoose');

const reporteVentaSchema = new Schema({
    ubicacion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    totalVentas: {
        type: Number,
        required: true
    }
});

module.exports = model('ReporteVenta', reporteVentaSchema);