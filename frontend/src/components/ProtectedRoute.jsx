import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


// Componente de Rota Protegida
export function ProtectedRoute() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Se não estiver logado, redireciona para a página de login
        return <Navigate to="/login" replace />;
    }

    // Se estiver logado, renderiza o conteúdo da rota (ex: o Dashboard)
    return <Outlet />;
}