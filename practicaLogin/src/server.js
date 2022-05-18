const express = require('express');
const exphbs = require('express-handlebars');
const res = require('express/lib/response');
const path = require('path');
const methodOverride = require('method-override');
const flash = require("connect-flash");
const session = require('express-session');
const { nextTick } = require('process');

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
app.use(flash());

//Variables Globales
// res.locals.error_msg = req.flash('error_msg');
// next();
//Rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));


//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public' )));

module.exports = app; 