const { Schema, model } = require('mongoose');
const config = require('../config/config');

const permisoSchema = new Schema({
    rol: {
        type: String,
        required: true,
        unique: true,
        enum: config.roles
    },
    verUsuario: {
        type: Boolean,
        required: true
    },
    verPerfilUsuario: {
        type: Boolean,
        required: true
    },
    actualizarPerfilUsuario: {
        type: Boolean,
        required: true
    },
    registrarMaquina: {
        type: Boolean,
        required: true
    },
    actualizarInventario: {
        type: Boolean,
        required: true
    },
    registrarVenta: {
        type: Boolean,
        required: true
    },
    registrarCompra: {
        type: Boolean,
        required: true
    },
    registrarUsuario: {
        type: Boolean,
        required: true
    },
    actualizarUsuario: {
        type: Boolean,
        required: true
    },
    registrarContrato: {
        type: Boolean,
        required: true
    },
    verUsuarios: {
        type: Boolean,
        required: true
    },
    verReportes: {
        type: Boolean,
        required: true
    },
    verReporte: {
        type: Boolean,
        required: true
    }
});

module.exports = model('Permiso', permisoSchema);