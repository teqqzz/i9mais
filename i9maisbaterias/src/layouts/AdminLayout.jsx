import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../admin.css'; 

import { 
    FaTachometerAlt, 
    FaProjectDiagram, 
    FaFileAlt, 
    FaLightbulb, 
    FaSignOutAlt, 
    FaUserCircle, 
    FaEnvelope, 
    FaCogs 
} from 'react-icons/fa';

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

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
                            <NavLink to="/admin/messages" className={getNavLinkClass}>
                                <FaEnvelope /> Mensagens
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
                        <li>
                            <NavLink to="/admin/settings" className={getNavLinkClass}>
                                <FaCogs /> Configurações
                            </NavLink>
                        </li>
          </ul>
                </nav>
        <div className="admin-sidebar-footer">
                    {user && (
                        <div className="user-info">
                            <FaUserCircle size={20} />
                            <span>{user.username}</span>
                        </div>
                    )}
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