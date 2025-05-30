import nodemailer from 'nodemailer';	
import fs from 'fs/promises';
import path from 'path';

async function sendOtpEmail(email: string, otp: string, subject: string) {
try {
    const templatePath = path.join(process.cwd(), "templates", 'otp-Email.html')
    let htmlTemplate = await fs.readFile(templatePath, 'utf-8')
    htmlTemplate = htmlTemplate
      .replace('{{otp}}', otp)
      .replace('{{year}}', new Date().getFullYear().toString());

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: htmlTemplate
    }
   await transporter.sendMail(mailOptions)
    return true;
} catch (error: any) {
    throw new Error(error.message)
}
}
export default sendOtpEmail;