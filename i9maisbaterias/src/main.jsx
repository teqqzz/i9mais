import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import './admin.css';

import { AuthProvider } from './context/AuthProvider.jsx';
import App from './App.jsx';
import { AdminLayout } from './layouts/AdminLayout.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';

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
import { MessagesPage } from './pages/admin/MessagesPage.jsx';
import { SettingsPage } from './pages/admin/SettingsPage.jsx';
import { UserManagementPage } from './pages/admin/UserManagementPage.jsx'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      { index: true, element: <HomePage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'solucoes/:slug', element: <SolutionPage /> },
      { path: 'projetos/:slug', element: <ProjectPage /> },
    ],
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
          { path: 'messages', element: <MessagesPage /> },
                    { path: 'users', element: <UserManagementPage /> }, // NOVO
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);