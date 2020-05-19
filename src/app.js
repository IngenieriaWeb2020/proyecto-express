const express = require('express');
const cron = require('node-cron');

const config = require('./config/config');
const dbms = require('./persistence/dbms');
const tareasProgramadas = require('./business/tareasProgramadas');

// Inicio de la aplicación y base de datos
const app = express();
dbms.connect();

// Configuraciones para la comunicación con la api
app.use(express.json()); // Entender un objeto json y convertirlo a js
app.use(express.urlencoded({extended: false})); // Entender parámetros en la url

// Controladores de los EndPoints expuestos por la api
app.use(require('./controller/loginController'));
app.use(require('./controller/maquinaController'));
app.use(require('./controller/ventaController'));

// Tareas programadas en la aplicacion
cron.schedule('0 6 1 * *', function(){ // El primero de cada mes a las 6:00 am
    tareasProgramadas.generarReportesInventario();
});

cron.schedule('0 6 * * Saturday', function(){ // Todos los sábados a las 6:00 am
    tareasProgramadas.ventasSemanales();
});

app.listen(config.PORT, () => console.log(`Aplicación corriendo en http://localhost:${config.PORT}`));