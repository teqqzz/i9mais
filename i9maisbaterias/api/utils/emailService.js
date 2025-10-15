import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendContactNotification = async (toAddress, formData) => {
    const mailOptions = {
        from: '"Contato Site i9+" <onboarding@resend.dev>', 
        to: toAddress,
        replyTo: formData.email, 
        subject: `Nova Mensagem de Contato de: ${formData.name}`,
        html: `
            <h2>Nova Mensagem Recebida do Site</h2>
            <p><strong>Nome:</strong> ${formData.name}</p>
            <p><strong>Email (para resposta):</strong> ${formData.email}</p>
            <p><strong>Telefone:</strong> ${formData.phone || 'Não informado'}</p>
            <hr>
            <h3>Mensagem:</h3>
            <p>${formData.message.replace(/\n/g, '<br>')}</p>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail de notificação enviado:', info.messageId);
        return true;
    } catch (error) {
        console.error('Erro ao enviar e-mail de notificação:', error);
        return false;
    }
};