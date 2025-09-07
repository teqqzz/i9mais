import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// CSS
import './index.css';
import './admin.css';

// Contexto
import { AuthProvider } from './context/AuthContext.jsx'; 

// Layouts e Protetor
import App from './App.jsx';
import { AdminLayout } from './layouts/AdminLayout.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';

// Páginas Públicas
import { HomePage } from './pages/HomePage.jsx';
import { BlogPostPage } from './pages/BlogPostPage.jsx';
import { SolutionPage } from './pages/SolutionPage.jsx';
import { ProjectPage } from './pages/ProjectPage.jsx';
import { LoginPage } from './pages/admin/LoginPage.jsx';
import { DashboardPage } from './pages/admin/DashboardPage.jsx';
import { ProjectListPage } from './pages/admin/ProjectListPage.jsx';
import { ProjectFormPage } from './pages/admin/ProjectFormPage.jsx';
import { SolutionListPage } from './pages/admin/SolutionListPage.jsx';
import { SolutionFormPage } from './pages/admin/SolutionFormPage.jsx';
import { ArticleListPage } from './pages/admin/ArticleListPage.jsx';
import { ArticleFormPage } from './pages/admin/ArticleFormPage.jsx';


// Configuração das rotas
const router = createBrowserRouter([
    {
        // Rotas Públicas
        path: '/',
        element: <App />, 
        children: [
            { index: true, element: <HomePage /> },
            { path: 'blog/:slug', element: <BlogPostPage /> },
            { path: 'solucoes/:slug', element: <SolutionPage /> },
            { path: 'projetos/:slug', element: <ProjectPage /> },
        ],
    },
    {
        // Rota de Login
        path: '/login',
        element: <LoginPage />
    },
    {
        // Rotas Protegidas do Admin
        path: '/admin',
        element: <ProtectedRoute />,
        children: [
            {
                element: <AdminLayout />, 
                children: [
                    { path: 'dashboard', element: <DashboardPage /> },
                    
                    // Rotas de Projetos
                    { path: 'projetos', element: <ProjectListPage /> },
                    { path: 'projetos/novo', element: <ProjectFormPage /> },
                    { path: 'projetos/editar/:id', element: <ProjectFormPage /> },

                    // Rotas de Soluções
                    { path: 'solucoes', element: <SolutionListPage /> },
                    { path: 'solucoes/novo', element: <SolutionFormPage /> },
                    { path: 'solucoes/editar/:id', element: <SolutionFormPage /> },
                    
                    // ROTAS DE ARTIGOS 
                    { path: 'artigos', element: <ArticleListPage /> },
                    { path: 'artigos/novo', element: <ArticleFormPage /> },
                    { path: 'artigos/editar/:id', element: <ArticleFormPage /> },
                ]
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);