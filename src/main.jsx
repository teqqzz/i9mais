import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { BlogPostPage } from './pages/BlogPostPage.jsx';
import { SolutionPage } from './pages/SolutionPage.jsx';
import { ProjectPage } from './pages/ProjectPage.jsx'; // 1. IMPORTAR A NOVA PÁGINA
import './index.css';

// Configuração das rotas
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);