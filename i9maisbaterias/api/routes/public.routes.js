import express from 'express';
import db from '../db/db.js';

const router = express.Router();

router.get('/home-data', async (req, res) => {
    try {
        const layoutRes = await db.query(
            "SELECT * FROM home_page_sections WHERE is_visible = true ORDER BY position ASC"
        );
        
        const impactRes = await db.query("SELECT key, value FROM settings WHERE key LIKE 'impact_%'");
        const impactData = impactRes.rows.reduce((acc, row) => {
            const cleanKey = row.key.replace('impact_', '');
            acc[cleanKey] = parseFloat(row.value) || 0;
            return acc;
        }, {});

        const calcRes = await db.query("SELECT key, value FROM settings WHERE key LIKE 'calc_%'");
        const calcPrices = calcRes.rows.reduce((acc, row) => {
            const cleanKey = row.key.replace('calc_', '');
            acc[cleanKey] = parseFloat(row.value) || 0;
            return acc;
        }, {});
        
        res.json({
            layout: layoutRes.rows,
            impactData: impactData,
            calculatorPrices: calcPrices
        });
        
    } catch (err) {
        console.error("Erro ao buscar dados públicos da home:", err.message);
        res.status(500).json({ error: "Falha ao buscar dados da página." });
    }
});

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