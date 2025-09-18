import express from 'express';
import { create } from '../models/message.js';
import { sendContactNotification } from '../utils/emailService.js';
import db from '../db/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const formData = req.body;
        if (!formData.name || !formData.email || !formData.message) {
            return res.status(400).json({ 
                success: false, 
                error: 'Nome, e-mail e mensagem são obrigatórios.' 
            });
        }

        const messageId = await create(formData);
        
        // Busca o e-mail de destino no banco de dados
        const { rows } = await db.query("SELECT value FROM settings WHERE key = 'contact_email'");
        const targetEmail = rows[0]?.value;

        if (targetEmail) {
            await sendContactNotification(targetEmail, formData);
        } else {
            console.warn("AVISO: E-mail de contato não configurado nos settings. Notificação não enviada.");
        }

        res.status(201).json({ 
            success: true, 
            message: 'Mensagem enviada com sucesso!',
            messageId: messageId 
        });
    } catch (err) {
        console.error('Erro na rota de contato:', err.message);
        res.status(500).json({ 
            success: false, 
            error: 'Ocorreu um erro no servidor. Tente novamente.' 
        });
    }
});

export default router;