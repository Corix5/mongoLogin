const recuperacionCtrl = {};

const User = require("../models/User");
const bcrypt = require('bcryptjs');

recuperacionCtrl.renderRecuperacion = async (req, res)=>{
    const users = await User.findById(req.params.id).lean();
    res.render('recuperacion/formularioRecuperacion',{users});
};

recuperacionCtrl.updatePassword = async (req, res)=>{
    const errors = [];

    const {contrasena, contrasena2} = req.body;
    if(contrasena != contrasena2){
        errors.push({text: 'Contraseñas no coinciden'});
    }
    if(contrasena.length < 8){
        errors.push({text: 'Las contraseñas deben ser de almenos 8 caracteres'})
    }
    if(errors.length > 0){
        res.render('/recuperacion')
     }else {
            const {contrasena} = req.body;
            const newUser = new User({password: contrasena});
            newUser.password = await newUser.encyptPassword(contrasena);
            await User.findByIdAndUpdate(req.params.id, {password:newUser.password});
            res.redirect('/users/signin');
           
   }
    
}

module.exports = recuperacionCtrl;