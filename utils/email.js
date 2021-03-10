const nodemailer = require("nodemailer");
const sesTransport = require('nodemailer-ses-transport');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

const sendEmail = async (options) => {
    //1 create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASS
        }
    });

    //2 Define the email options
    const mailOptions = {
        from: 'steph dev <steph@ms2a.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    //3send the email
    return await transporter.sendMail(mailOptions);
}

//new Email(user, url)

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.name = user.name;
        this.url = url;
        this.from = process.env.EMAIL_FROM
    }

    createNewTransport(){
        return nodemailer.createTransport(sesTransport({
            accessKeyId : process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'eu-west-3'
        }));
    }

    async send(template, subject) {
        const html = pug.renderFile(`${__dirname}/../view/emails/${template}.pug`, {
            name: this.name,
            url: this.url,
            subject
        });
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            text: htmlToText(html)
        }
        await this.createNewTransport().sendMail(mailOptions);
    }
    async sendWelcome(){
        await this.send('welcome', 'welcome to my website');
    }

    async sendResetPassword(){
        await this.send('resetPassword', 'يمكنك تغيير كلمة السر الآن , هذا الرابط صاحك لمدة عشرة دقائق');
    }
    async sendContact(){
        await this.send('contactUs', 'شكرا لتواصلك معي');
    }
}

