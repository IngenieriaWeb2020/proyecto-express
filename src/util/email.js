const mailer = require('nodemailer');
const config = require('../config/config');

function enviarCorreo(para, asunto, contenido){
    let transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.EMAIL_ACCOUNT,
            pass: config.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: config.EMAIL_ACCOUNT,
        to: para,
        subject: asunto,
        text: contenido
    };

    transporter.sendMail(mailOptions)
        .then((data) => {
            console.log('Correo enviado!');
        })
        .catch((err) => {
            console.log(err);
        });

    transporter.close();
}

module.exports = enviarCorreo;