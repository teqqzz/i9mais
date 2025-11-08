import React, { useState, useEffect } from 'react';
import { API_URL } from '@/config';
import { useAuth } from '../../hooks/useAuth';
import { FaTrash, FaUserPlus } from 'react-icons/fa';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function UserManagementPage() {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [currentPassword, setCurrentPassword] = useState('');
    const [changePassword, setChangePassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [status, setStatus] = useState({ type: '', message: '' });

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/admin/users`, { credentials: 'include' });
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error("Erro ao buscar usuários:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const showStatus = (type, message) => {
        setStatus({ type, message });
        setTimeout(() => setStatus({ type: '', message: '' }), 4000);
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/api/admin/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: newUsername, password: newPassword }),
            credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
            showStatus('success', `Usuário "${newUsername}" criado com sucesso!`);
            setNewUsername('');
            setNewPassword('');
            fetchUsers();
        } else {
            showStatus('error', `Erro: ${data.error}`);
        }
    };

    const handleDeleteUser = async (userId, username) => {
        if (window.confirm(`Tem certeza que deseja deletar o usuário "${username}"?`)) {
            const res = await fetch(`${API_URL}/api/admin/users/${userId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await res.json();
            if (res.ok) {
                showStatus('success', `Usuário "${username}" deletado.`);
                fetchUsers();
            } else {
                showStatus('error', `Erro: ${data.error}`);
            }
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (changePassword !== confirmPassword) {
            showStatus('error', 'A nova senha e a confirmação não coincidem.');
            return;
        }
        const res = await fetch(`${API_URL}/api/admin/users/change-password`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentPassword, newPassword: changePassword }),
            credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
            showStatus('success', data.message);
            setCurrentPassword('');
            setChangePassword('');
            setConfirmPassword('');
        } else {
            showStatus('error', `Erro: ${data.error}`);
        }
    };

    return (
        <>
            <header className="admin-header"><h1>Gerenciar Usuários</h1></header>
            <main className="admin-page-content">
                {status.message && <div className={`form-status-global ${status.type}`}>{status.message}</div>}

                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <div className="admin-card">
                            <div className="admin-card-header"><h2>Usuários Existentes</h2></div>
                            <div className="admin-card-body">
                                <table className="admin-table">
                                    <thead><tr><th>Nome de Usuário</th><th>Ações</th></tr></thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.username} {user.id === currentUser.id && '(Você)'}</td>
                                                <td>
                                                    <button 
                                                        onClick={() => handleDeleteUser(user.id, user.username)} 
                                                        className="admin-btn danger"
                                                        disabled={user.id === currentUser.id}
                                                        title={user.id === currentUser.id ? "Você não pode se deletar" : "Deletar usuário"}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="settings-grid" style={{ marginTop: '30px' }}>
                            <div className="admin-card">
                                <div className="admin-card-header"><h2><FaUserPlus /> Adicionar Novo Usuário</h2></div>
                                <div className="admin-card-body">
                                    <form onSubmit={handleAddUser} className="admin-form">
                                        <div className="form-group"><label>Nome de Usuário</label><input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} required /></div>
                                        <div className="form-group"><label>Senha</label><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required /></div>
                                        <div className="form-actions"><button type="submit" className="admin-btn primary">Adicionar Usuário</button></div>
                                    </form>
                                </div>
                            </div>
                            <div className="admin-card">
                                <div className="admin-card-header"><h2>Alterar Minha Senha</h2></div>
                                <div className="admin-card-body">
                                    <form onSubmit={handleChangePassword} className="admin-form">
                                        <div className="form-group"><label>Senha Atual</label><input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required /></div>
                                        <div className="form-group"><label>Nova Senha</label><input type="password" value={changePassword} onChange={(e) => setChangePassword(e.target.value)} required /></div>
                                        <div className="form-group"><label>Confirmar Nova Senha</label><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div>
                                        <div className="form-actions"><button type="submit" className="admin-btn primary">Alterar Senha</button></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </>
    );
}