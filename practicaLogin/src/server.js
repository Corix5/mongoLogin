const express = require('express');
const path = require('path');

//inicializaciones
const app = express();

//configraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views' ));

//middlewares
app.use(express.urlencoded({extended: false}));

//Variables Globales

//Rutas
app.get('/', (req,res) =>{
    res.send('hello world');
});


//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public' )));

module.exports = app; 