    import express from 'express';
    import { create } from '../models/message.js';

    const router = express.Router();

    // POST /api/contact
    // Rota pública para receber envios do formulário de contato
    router.post('/', async (req, res) => {
        try {
            const { name, email, phone, message } = req.body;

            // Validação simples de backend
            if (!name || !email || !message) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Nome, e-mail e mensagem são obrigatórios.' 
                });
            }

            // Salva no banco de dados
            const messageId = await create({ name, email, phone, message });

            res.status(201).json({ 
                success: true, 
                message: 'Mensagem enviada com sucesso!',
                messageId: messageId 
            });

        } catch (err) {
            console.error('Erro ao salvar mensagem de contato:', err.message);
            res.status(500).json({ 
                success: false, 
                error: 'Ocorreu um erro no servidor. Tente novamente.' 
            });
        }
    });

    export default router;