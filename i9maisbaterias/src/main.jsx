import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import './index.css';
import './admin.css';

import { AuthProvider } from './context/AuthProvider.jsx';
import { HomeContentProvider } from './context/HomeContentProvider.jsx'; // NOVO
import App from './App.jsx';
import { AdminLayout } from './layouts/AdminLayout.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';

// ... (imports de todas as suas páginas)
import { HomePage } from './pages/HomePage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
// ... etc

import { AboutPageEditor } from './pages/admin/AboutPageEditor.jsx';
import { HomePageEditor } from './pages/admin/HomePageEditor.jsx'; // NOVO

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      { index: true, element: <HomePage /> },
      { path: 'sobre', element: <AboutPage /> },
            // ... (suas outras rotas públicas)
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
                    { path: 'home-editor', element: <HomePageEditor /> }, // NOVO
          { path: 'sobre', element: <AboutPageEditor /> },
                    // ... (resto das rotas de admin)
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <HelmetProvider>
        <AuthProvider>
                <HomeContentProvider> {/* ENVOLVE A APLICAÇÃO */}
              <RouterProvider router={router} />
                </HomeContentProvider>
        </AuthProvider>
        </HelmetProvider>
  </React.StrictMode>
);