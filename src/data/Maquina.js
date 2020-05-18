const { Schema, model } = require('mongoose');

const maquinaSchema = new Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    precioCompra: {
        type: Number,
        required: true
    },
    reciboCompra: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaVenta: {
        type: Date,
        default: Date.now()
    },
    vendedor: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        enum: [
            'Nueva',
            'Segunda'
        ]
    },
    estadoInventario:{
        type: String,
        default: 'Disponible',
        enum: [
            'Disponible',
            'Vendida',
            'Vendiendo'
        ]
    }
});

module.exports = model('Maquina', maquinaSchema);