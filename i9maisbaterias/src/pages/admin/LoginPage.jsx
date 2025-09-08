import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Navigate } from 'react-router-dom';

// Componente da Página de Login do Admin
export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Se o usuário já está logado, joga ele para o dashboard
    if (isAuthenticated) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const success = await login(username, password);
            if (success) {
                navigate('/admin/dashboard'); // Redireciona após login com sucesso
            }
        } catch (err) {
            setError(err.message || 'Falha no login. Tente novamente.');
        }
    };

    return (
        <div className="container page-content" style={{ maxWidth: '500px', marginTop: '50px' }}>
            <h2>Login Administrativo</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="cta-button">Entrar</button>
            </form>
        </div>
    );
}