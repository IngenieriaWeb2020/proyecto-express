const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

const userSchema = new Schema({
    cedula: {
        type: String
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        lowercase: true,
        trim: true  // Quita espacios en blanco
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'tercero',
        enum: config.roles
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    fechaRegistro: {
        type: Date,
        default: Date.now()
    },
    fechaUltimaConexion: {
        type: Date
    }
})

userSchema.path('cedula').index({sparse: true})

userSchema.methods.encryptPassword = async (password) => {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.methods.validatePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

module.exports = model('User', userSchema);