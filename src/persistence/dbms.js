const mongoose = require('mongoose');
const config = require('../config/config');

module.exports = {
    connect: () => {
        mongoose.connect(config.DB, {useNewUrlParser: true,useUnifiedTopology: true})
            .then(() => {
                console.log('Conectado a base de datos Mongo')
            })
            .catch(err => console.log(err));
    }
}