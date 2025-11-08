import express from 'express';
import db from '../db/db.js';

const router = express.Router();

// Rota ÚNICA para carregar TODOS os dados públicos necessários para a Home
router.get('/home-data', async (req, res) => {
    try {
        // 1. Busca o layout (ordem e visibilidade)
        const layoutRes = await db.query(
            "SELECT * FROM home_page_sections WHERE is_visible = true ORDER BY position ASC"
        );
        
        // 2. Busca os dados de impacto (das settings)
        const impactRes = await db.query("SELECT key, value FROM settings WHERE key LIKE 'impact_%'");
        const impactData = impactRes.rows.reduce((acc, row) => {
            const cleanKey = row.key.replace('impact_', '');
            acc[cleanKey] = parseFloat(row.value) || 0;
            return acc;
        }, {});

        // 3. Busca os preços da calculadora (das settings)
        const calcRes = await db.query("SELECT key, value FROM settings WHERE key LIKE 'calc_%'");
        const calcPrices = calcRes.rows.reduce((acc, row) => {
            const cleanKey = row.key.replace('calc_', '');
            acc[cleanKey] = parseFloat(row.value) || 0;
            return acc;
        }, {});
        
        // 4. Retorna tudo em um único objeto JSON
        res.json({
            layout: layoutRes.rows,
            impactData: impactData,
            calculatorPrices: calcPrices
        });
        
    } catch (err) {
        console.error("Erro ao buscar dados públicos da home:", err);
        res.status(500).json({ error: "Falha ao buscar dados da página." });
    }
});

// Rotas públicas para páginas internas (Sobre)
router.get('/page/about-us', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT value FROM settings WHERE key = 'page_about_us'");
        if (rows.length === 0) {
            return res.status(404).json({ error: "Conteúdo da página não encontrado." });
        }
        res.json({ content: rows[0].value });
    } catch (err) {
        res.status(500).json({ error: "Falha ao buscar dados da página." });
    }
});

export default router;