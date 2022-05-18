const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

//inicializaciones
const app = express();

//configraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views' ));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
app.use(express.urlencoded({extended: false}));

//Variables Globales

//Rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));


//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public' )));

module.exports = app; 