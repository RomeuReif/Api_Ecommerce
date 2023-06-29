const transporter = require('nodemailer').createTransport(require("../config/email"));
const { root: link } = require("../config/index");

module.exports = ({ usuario, recovery }, cb) => {
    const message = `   
        <h1 style="text-align: center";> Recuperacao de senha </h1>
        <br>
        <p>
            Aqui está o link para redefinir sua senha. Acesse ele e digite a sua nova senha:
        </p>
        <a href="${link}/v1/api/usuarios/senha-recuperada?token=${recovery.token}">
            ${link}/v1/api/usuarios/senha-recuperada?token=${recovery.token}
        </a>
        <br><br><hr>
        <p>
            Obs: Se você não solicitou a redefinicao, apenas ignore esse email.
        </p>
        <p>Atenciosamente, Engel Store</p>
    `;

    const opcoesEmail = {
        from: "naoresponder@engelstore.com",
        to: usuario.email,
        subject: "Redefinicao de senha - Engel Store",
        html: message
    };

    if(process.env.NODE_ENV === "production") {
        transporter.sendMail(opcoesEmail, (error, info) => {
            if(error) {
                console.log(error);
                return cb("Aconteceu um erro no envio do email, tente novamente.");
            } else {
                return cb(null, "Link para redefinicao de senha foi enviado com sucesso");
            }
        })
    } else {    
        console.log(opcoesEmail);
        return cb(null, "Link para redefinicao de senha foi enviado com sucesso");
    }
};