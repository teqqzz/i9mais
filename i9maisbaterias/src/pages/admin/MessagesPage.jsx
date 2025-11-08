import React, { useState, useEffect } from 'react';
import { API_URL } from '@/config';
import { FaTrash, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function MessagesPage() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/admin/messages`, { credentials: 'include' });
            const data = await res.json();
            setMessages(data);
        } catch (err) {
            console.error("Erro ao buscar mensagens:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar esta mensagem?')) {
            await fetch(`${API_URL}/api/admin/messages/${id}`, { 
                method: 'DELETE',
                credentials: 'include' 
            });
            fetchMessages();
        }
    };

    return (
        <>
            <header className="admin-header">
                <h1>Mensagens de Contato ({isLoading ? '...' : messages.length})</h1>
            </header>
            <main className="admin-page-content">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h2>Todas as Mensagens</h2>
                        </div>
                        <div className="admin-card-body">
                            <div className="admin-table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Telefone</th>
                                            <th>Mensagem</th>
                                            <th>Recebido em</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {messages.map(msg => (
                                            <tr key={msg.id}>
                                                <td>{msg.name}</td>
                                                <td>{msg.email}</td>
                                                <td>{msg.phone}</td>
                                                <td><p className="message-content">{msg.message}</p></td>
                                                <td>{new Date(msg.created_at).toLocaleDateString('pt-BR')}</td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button onClick={() => handleDelete(msg.id)} className="admin-btn danger">
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}