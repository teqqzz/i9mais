// Middleware para proteger rotas que requerem autenticação
export default function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(403).json({ error: 'Usuário não autenticado' });
    }
    next();
}