import express from 'express';
import db from '../db/db.js';

const router = express.Router();

// Rota pública para buscar os dados do dashboard de impacto
router.get('/impact-data', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT key, value FROM settings WHERE key LIKE 'impact_%'");
        
        const impactData = rows.reduce((acc, row) => {
            // Transforma 'impact_mwh' em 'mwh'
            const cleanKey = row.key.replace('impact_', '');
            acc[cleanKey] = parseFloat(row.value) || 0;
            return acc;
        }, {});

        res.json(impactData);
    } catch (err) {
        console.error("Erro ao buscar dados de impacto:", err);
        res.status(500).json({ error: "Falha ao buscar dados." });
    }
});

// Rota pública para buscar os preços da calculadora
router.get('/calculator-prices', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT key, value FROM settings WHERE key LIKE 'calc_%'");

        const calcPrices = rows.reduce((acc, row) => {
            const cleanKey = row.key.replace('calc_', '');
            acc[cleanKey] = parseFloat(row.value) || 0;
            return acc;
        }, {});

        res.json(calcPrices);
    } catch (err) {
        console.error("Erro ao buscar preços da calculadora:", err);
        res.status(500).json({ error: "Falha ao buscar dados." });
    }
});

export default router;