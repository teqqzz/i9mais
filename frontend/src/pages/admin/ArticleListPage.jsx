import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { API_URL } from '../config';



// Componente da Página de Lista de Artigos (Admin)
export function ArticleListPage() {
    const [articles, setArticles] = useState([]);

    async function fetchArticles() {
        try {
            const response = await fetch(`${API_URL}/api/artigos?limit=100`); // API de Artigos
            const data = await response.json();
            setArticles(data.posts);
        } catch (err) {
            console.error("Erro ao buscar artigos:", err);
        }
    }

    useEffect(() => {
        fetchArticles();
    }, []);

    // Função para deletar um artigo
    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este artigo?')) {
            try {
                const response = await fetch(`${API_URL}/api/artigos/${id}`, { // API de Artigos
                    method: 'DELETE',
                    credentials: 'include', 
                });
                const data = await response.json();
                if (data.success) {
                    setArticles(articles.filter(a => a.id !== id));
                    alert('Artigo deletado com sucesso!');
                } else {
                    throw new Error(data.error || 'Falha ao deletar');
                }
            } catch (err) {
                console.error(err);
                alert(`Erro: ${err.message}`);
            }
        }
    };

    return (
        <>
            <header className="admin-header">
                <h1>Gerenciar Artigos (Blog) ({articles.length})</h1>
            </header>
            <main className="admin-page-content">
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h2>Todos os Artigos</h2>
                        <Link to="/admin/artigos/novo" className="admin-btn primary"> {/* Link de Artigos */}
                            <FaPlus /> Novo Artigo
                        </Link>
                    </div>
                    <div className="admin-card-body">
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Imagem</th>
                                        <th>Título</th>
                                        <th>Resumo</th>
                                        <th>Slug</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {articles.map(post => (
                                        <tr key={post.id}>
                                            <td>
                                                <img 
                                                    src={`${API_URL}${post.image_url}`} 
                                                    alt={post.title} 
                                                    className="table-preview" 
                                                />
                                            </td>
                                            <td>{post.title}</td>
                                            <td>{post.summary}</td>
                                            <td>/{post.slug}</td>
                                            <td>
                                                <div className="table-actions">
                                                    <Link to={`/admin/artigos/editar/${post.id}`} className="admin-btn secondary"> {/* Link de Artigos */}
                                                        <FaEdit />
                                                    </Link>
                                                    <button onClick={() => handleDelete(post.id)} className="admin-btn danger">
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
            </main>
        </>
    );
}