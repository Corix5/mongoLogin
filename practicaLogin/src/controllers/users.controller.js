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
            req.flash('error_msg', 'El correo ya está en uso');
             res.redirect('/users/signup');
         } else{
                const newUser = new User({name: nombre, email:correo, password: contrasena});
                newUser.password = await newUser.encyptPassword(contrasena);
                await newUser.save(); 
                res.redirect('/users/signin');
            }
    }
};

usersCtrl.renderSigninForm = async (req, res) => {
    const users = await User.findOne().lean();
    res.render("users/signin", {users});
};

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/userInfo',
    failureFlash: true
});


usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg','Se ha cerrado la sesión');
    res.redirect('/users/signin');
}
module.exports = usersCtrl;