import React, { createContext, useState, useContext, useEffect } from 'react';
import { API_URL } from '../config';

// 1. Criar o Contexto
const AuthContext = createContext(null);

// 2. Criar o "Provedor" (que vai envolver seu app)
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Para saber se já checamos a autenticação

    // Função para checar se já existe uma sessão de cookie válida no backend
    const checkAuthStatus = async () => {
        try {
            const response = await fetch(`${API_URL}/check-auth`, {
                credentials: 'include', // Envia o cookie de sessão
            });
            const data = await response.json();
            setIsAuthenticated(data.isAuthenticated);
        } catch (err) {
            console.error('Erro ao checar autenticação:', err);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    // Rodar a checagem assim que o app carregar
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Função de Login que nossas páginas vão chamar
    const login = async (username, password) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include', 
            });

            if (!response.ok) {
                throw new Error('Usuário ou senha incorretos');
            }
            
            const data = await response.json();
            if (data.success) {
                setIsAuthenticated(true);
                setLoading(false);
                return true; 
            }
        } catch (err) {
            setLoading(false);
            setIsAuthenticated(false);
            throw err; 
        }
    };

    // Função de Logout
    const logout = async () => {
        try {
            await fetch(`${API_URL}/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch (err) {
            console.error('Erro ao fazer logout:', err);
        } finally {
            setIsAuthenticated(false); // Desloga no frontend de qualquer jeito
        }
    };

    // Valor que será compartilhado com todos os componentes dentro do Provedor
    const value = {
        isAuthenticated,
        loading,
        login,
        logout,
    };

    // Não renderiza nada até que a checagem inicial de auth esteja completa
    if (loading) {
        return <div>Carregando aplicação...</div>; 
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// 3. Hook customizado para facilitar o uso do contexto

export function useAuth() {
    return useContext(AuthContext);
}