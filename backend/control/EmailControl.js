const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'escolasge@gmail.com',
        pass: 'pogzmzlindippcnn'
    }
});

class EmailControl {
    async enviarEmail(req, res) {
        const { destinatario, assunto, mensagem } = req.body;

        try {
            await transporter.sendMail({
                to: destinatario,
                subject: assunto,
                html: mensagem
            });
            console.log("E-mail enviado com sucesso!");
            res.status(200).send("E-mail enviado com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar e-mail:", error);
            res.status(500).send("Erro ao enviar e-mail");
        }
    }
}

module.exports = new EmailControl();