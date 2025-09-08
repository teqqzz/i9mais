import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext'; // Importa o contexto que acabamos de criar
import { API_URL } from '@/config';

// Este arquivo tem uma única responsabilidade: ser o componente que provê o contexto.
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuthStatus = async () => {
        setIsLoading(true); // Garante que está carregando
        try {
            const response = await fetch(`${API_URL}/api/auth/check-auth`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setIsAuthenticated(data.isAuthenticated); // <-- USA a variável
            } else {
                setIsAuthenticated(false); // <-- USA a variável
            }
        } catch (error) {
            console.error('Erro ao checar autenticação:', error);
            setIsAuthenticated(false); // <-- USA a variável
        } finally {
            setIsLoading(false); // <-- USA a variável
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const login = async (username, password) => { // <-- USA as variáveis
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }), // <-- USA as variáveis
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Falha no login');
        }

        const data = await response.json();
        if (data.success) {
            setIsAuthenticated(true); // <-- USA a variável
        }
        return data;
    };

    const logout = async () => {
        await fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        setIsAuthenticated(false); // <-- USA a variável
    };

    const value = { isAuthenticated, isLoading, login, logout, checkAuthStatus };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
