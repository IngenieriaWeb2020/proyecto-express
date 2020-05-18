module.exports = {
    PORT: process.env.PORT || 3000,
    DB: process.env.DB || 'mongodb://localhost:27017/confeccionDb',
    SECRET_KEY: process.env.SECRET_KEY || 'confeccion123',
    loggedInTime: '1d',
    buyingTime: '10m',
    roles: [
        'admin',
        'encargadoInventario',
        'empleado',
        'tercero'
    ],
    EMAIL_ACCOUNT: process.env.EMAIL_ACCOUNT || 'maquinasconfeccion@gmail.com',
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'confeccion123'
}