import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import './admin.css';

import { AuthProvider } from './context/AuthProvider.jsx';
import { HomeContentProvider } from './context/HomeContentProvider.jsx';
import App from './App.jsx';
import { AdminLayout } from './layouts/AdminLayout.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';

import { HomePage } from './pages/HomePage.jsx';
// ... (imports de páginas públicas)
import { AboutPage } from './pages/AboutPage.jsx';

import { LoginPage } from './pages/admin/LoginPage.jsx';
// ... (imports de páginas de admin)
import { AboutPageEditor } from './pages/admin/AboutPageEditor.jsx';
import { HomePageEditor } from './pages/admin/HomePageEditor.jsx';
import { HomeLayoutEditor } from './pages/admin/HomeLayoutEditor.jsx'; // NOVO

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [ /* ... (rotas públicas) ... */ ],
  },
  { path: '/login', element: <LoginPage /> },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />, 
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
                    { path: 'home-layout', element: <HomeLayoutEditor /> }, // NOVO
                    { path: 'home-editor', element: <HomePageEditor /> },
          { path: 'messages', element: <MessagesPage /> },
                    { path: 'users', element: <UserManagementPage /> },
                    { path: 'sobre', element: <AboutPageEditor /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: 'projetos', element: <ProjectListPage /> },
          { path: 'projetos/novo', element: <ProjectFormPage /> },
          { path: 'projetos/editar/:id', element: <ProjectFormPage /> },
          { path: 'solucoes', element: <SolutionListPage /> },
          { path: 'solucoes/novo', element: <SolutionFormPage /> },
          { path: 'solucoes/editar/:id', element: <SolutionFormPage /> },
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
        <HelmetProvider>
        <AuthProvider>
                <HomeContentProvider>
              <RouterProvider router={router} />
                </HomeContentProvider>
        </AuthProvider>
        </HelmetProvider>
  </React.StrictMode>
);