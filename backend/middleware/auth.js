import React, { createContext, useState, useContext, useEffect } from 'react';
import { API_URL } from '@/config';

// Cria o Contexto de Autenticação
const AuthContext = createContext(null);

// Hook customizado para usar o contexto facilmente
export const useAuth = () => useContext(AuthContext);

// Componente Provedor que vai envolver sua aplicação
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Começa como true para checar o status inicial

    // Função para checar o status de autenticação com o backend
    const checkAuthStatus = async () => {
        try {
            const response = await fetch(`${API_URL}/api/auth/check-auth`, {
                credentials: 'include' 
            });

            if (!response.ok) {
                setIsAuthenticated(false);
                return;
            }

            const data = await response.json();
            setIsAuthenticated(data.isAuthenticated);
        } catch (error) {
            console.error('Erro ao checar autenticação:', error);
            setIsAuthenticated(false); 
        } finally {
            setIsLoading(false); 
        }
    };

    // Executa a verificação de status quando o app carrega pela primeira vez
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Função de Login
    const login = async (username, password) => {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Falha no login');
        }

        const data = await response.json();
        if (data.success) {
            setIsAuthenticated(true);
        }
        return data;
    };

    // Função de Logout
    const logout = async () => {
        await fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        setIsAuthenticated(false);
    };

    const value = {
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuthStatus
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
