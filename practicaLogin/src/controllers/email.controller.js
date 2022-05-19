const emailCtrl = {};
const nodemailer = require('nodemailer');
const User = require('../models/User');

emailCtrl.renderEmailForm = (req, res)=>{
    res.render('email/emailForm');
};

emailCtrl.emailForm = async (req, res) =>{
    const {correo} = req.body;
    const emailUser = await User.findOne({email: correo});
    if(emailUser){
      const id = emailUser.id;
      console.log(emailUser);
      res.send('email sended');
      let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "luisdavid201375@gmail.com", // generated ethereal user
            pass: "ciehfulauhibkmgv", // generated ethereal password
          },
        });
  
          // send mail with defined transport object
      let info = await transporter.sendMail({
      from: '"MiServicio 👻" <foo@example.com>', // sender address
      to: correo, // list of receivers
      subject: "Recuperación de contraseña ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>Has solicitado un cambio de contraseña para ello da clic en el siguiente enlace: </b> <a href="http://localhost:4000/recuperacion/${id}">http://localhost:4000/recuperacion/${id}</a>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }else{
      req.flash('error_msg', 'No se encontró este correo registrado');
             res.redirect('/email');
    }

        
}

module.exports = emailCtrl;