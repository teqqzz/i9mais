import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 


// Se o usuário não estiver autenticado, ele será redirecionado para a página de login.
export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    // Enquanto a autenticação está sendo verificada, mostramos uma mensagem de carregamento.
    if (isLoading) {
        return <div>Verificando autenticação...</div>;
    }

    // Se não estiver autenticado, redireciona para a página de login.
    // O 'replace' evita que o usuário possa voltar para a página anterior no histórico.
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Se estiver autenticado
    return <Outlet />;
};
