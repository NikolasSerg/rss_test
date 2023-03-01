const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
        })
    }

    async sendActivationMail(to, link) {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: 'Activation account on ' + process.env.API_URL,
                text: '',
                html:
                    `
                    <div>
                        <h1>For activation go to link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
            })
        } catch (error) {
            console.log(error, 'error mail sending');
        }

    }
}

module.exports = new MailService()