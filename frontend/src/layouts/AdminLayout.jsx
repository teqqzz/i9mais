import React from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../admin.css'; 
import { FaTachometerAlt, FaProjectDiagram, FaFileAlt, FaLightbulb, FaSignOutAlt } from 'react-icons/fa';

// Componente de Layout do Admin
export function AdminLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    // Função para lidar com logout
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    // Função para definir a classe ativa do NavLink
    const getNavLinkClass = ({ isActive }) => (isActive ? 'active' : '');

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <h2>Painel Admin</h2>
                </div>
                <nav className="admin-sidebar-nav">
                    <ul>
                        <li>
                            <NavLink to="/admin/dashboard" className={getNavLinkClass}>
                                <FaTachometerAlt /> Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/projetos" className={getNavLinkClass}>
                                <FaProjectDiagram /> Projetos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/artigos" className={getNavLinkClass}>
                                <FaFileAlt /> Artigos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/solucoes" className={getNavLinkClass}>
                                <FaLightbulb /> Soluções
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="admin-sidebar-footer">
                    <button onClick={handleLogout} className="admin-logout-btn">
                        <FaSignOutAlt /> Sair
                    </button>
                </div>
            </aside>
            <div className="admin-main-content">
               
                <Outlet />
            </div>
        </div>
    );
}