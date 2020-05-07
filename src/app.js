const express = require('express');
const config = require('./config/config');
const dbms = require('./persistence/dbms');

const app = express();
dbms.connect();

app.use(express.json()); // Entender un objeto json y convertirlo a js
app.use(express.urlencoded({extended: false})); 

app.use(require('./controller/generalController'));

app.listen(config.PORT, () => console.log(`Aplicación corriendo en http://localhost:${config.PORT}`));