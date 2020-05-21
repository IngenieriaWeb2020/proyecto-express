const { Schema, model } = require('mongoose');

const contratoSchema = new Schema({
    empleado: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    salario: {
        type: Number,
        required: true
    }
});

module.exports = model('Contrato', contratoSchema);