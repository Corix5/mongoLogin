const express = require('express');
const exphbs = require('express-handlebars');
const res = require('express/lib/response');
const path = require('path');
const methodOverride = require('method-override');
const flash = require("connect-flash");
const session = require('express-session');
// const { nextTick } = require('process');
const passport = require('passport');

//inicializaciones
const app = express();
require('./config/passport');

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
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Variables Globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})
// res.locals.error_msg = req.flash('error_msg');
// next();
//Rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/userInfo.routes'));
app.use(require('./routes/recuperacion.routes'));
app.use(require('./routes/email.routes'));

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public' )));

module.exports = app; 