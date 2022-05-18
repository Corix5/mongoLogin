const usersCtrl = {};

const passport = require('passport');

const User = require('../models/User');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) =>{
    const errors = [];

    const {nombre, correo, contrasena, contrasena2} = req.body;
    if(contrasena != contrasena2){
        errors.push({text: 'Contraseñas no coinciden'});
    }
    if(contrasena.length < 8){
        errors.push({text: 'Las contraseñas deben ser de almenos 8 caracteres'})
    }
    if(errors.length > 0){
        res.render('users/signup', {
            errors,
            nombre,
            correo
        })
    } else {
         const emailUser = await User.findOne({email: correo});
         if(emailUser){
            //  req.flash('error_msg', 'El correo ya está en uso');
             res.redirect('/users/signup');
         } else{
                const newUser = new User({name: nombre, email:correo, password: contrasena});
                newUser.password = await newUser.encyptPassword(contrasena);
                await newUser.save(); 
                res.redirect('/users/signin');
            }
    }
};

usersCtrl.renderSigninForm = (req, res) => {
    res.render("users/signin");
};

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/',
    failureFlash: true
});


usersCtrl.logout = (req, res) => {
    res.send('logout');
}
module.exports = usersCtrl;