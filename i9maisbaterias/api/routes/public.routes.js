import express from 'express';
import db from '../db/db.js';

const router = express.Router();

router.get('/impact-data', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT key, value FROM settings WHERE key LIKE 'impact_%'");
        const impactData = rows.reduce((acc, row) => {
            const cleanKey = row.key.replace('impact_', '');
            acc[cleanKey] = parseFloat(row.value) || 0;
            return acc;
        }, {});
        res.json(impactData);
    } catch (err) {
        res.status(500).json({ error: "Falha ao buscar dados." });
    }
});

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
        res.status(500).json({ error: "Falha ao buscar dados." });
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

router.get('/page/home', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT value FROM settings WHERE key = 'page_home_content'");
        if (rows.length === 0) {
            throw new Error("Conteúdo da página inicial não encontrado.");
        }
        const contentObject = JSON.parse(rows[0].value);
        res.json(contentObject);
    } catch (err) {
        console.error("Erro ao buscar ou parsear conteúdo da home:", err);
        res.status(500).json({ error: "Falha ao buscar dados da página." });
    }
});

router.get('/home-layout', async (req, res) => {
    try {
        const { rows } = await db.query(
            "SELECT component_key FROM home_sections WHERE is_visible = true ORDER BY position ASC"
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Falha ao buscar layout da home." });
    }
});

export default router;