import React from 'react';

// Componente da Página de Dashboard do Admin
export function DashboardPage() {
    return (
        <>
            <header className="admin-header">
                <h1>Dashboard</h1>
            </header>
            <main className="admin-page-content">
                <div className="admin-card">
                    <div className="admin-card-body">
                        <h2>Bem-vindo ao Painel!</h2>
                        <p>Use o menu à esquerda para gerenciar o conteúdo do seu site.</p>
                    </div>
                </div>
            </main>
        </>
    );
}