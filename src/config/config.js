module.exports = {
    PORT: process.env.PORT || 3000,
    DB: process.env.DB || 'mongodb://localhost:27017/confeccionDb',
    SECRET_KEY: 'confeccion123',
    loggedInTime: '1d',
    buyingTime: '10m',
    roles: [
        'admin',
        'encargadoInventario',
        'empleado',
        'tercero'
    ]
}