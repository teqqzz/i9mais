import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { API_URL } from '../config';

// Componente da Página de Lista de Projetos (Admin)
export function ProjectListPage() {
    const [projects, setProjects] = useState([]);

    // Função para buscar os projetos da API
    async function fetchProjects() {
        try {
            const response = await fetch(`${API_URL}/api/projetos?limit=100`); 
            const data = await response.json();
            setProjects(data.posts);
        } catch (err) {
            console.error("Erro ao buscar projetos:", err);
        }
    }

    // Busca os projetos ao carregar o componente
    useEffect(() => {
        fetchProjects();
    }, []);


    // Função para deletar um projeto
    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este projeto?')) {
            try {
                const response = await fetch(`${API_URL}/api/projetos/${id}`, {
                    method: 'DELETE',
                    credentials: 'include', // Envia o cookie de login
                });
                const data = await response.json();
                if (data.success) {
                    // Remove o projeto da lista no frontend
                    setProjects(projects.filter(p => p.id !== id));
                    alert('Projeto deletado com sucesso!');
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
                <h1>Gerenciar Projetos ({projects.length})</h1>
            </header>
            <main className="admin-page-content">
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h2>Todos os Projetos</h2>
                        <Link to="/admin/projetos/novo" className="admin-btn primary">
                            <FaPlus /> Novo Projeto
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
                                    {projects.map(proj => (
                                        <tr key={proj.id}>
                                            <td>
                                                <img 
                                                    src={`${API_URL}${proj.image_url}`} 
                                                    alt={proj.title} 
                                                    className="table-preview" 
                                                />
                                            </td>
                                            <td>{proj.title}</td>
                                            <td>{proj.summary}</td>
                                            <td>/{proj.slug}</td>
                                            <td>
                                                <div className="table-actions">
                                                    <Link to={`/admin/projetos/editar/${proj.id}`} className="admin-btn secondary">
                                                        <FaEdit />
                                                    </Link>
                                                    <button onClick={() => handleDelete(proj.id)} className="admin-btn danger">
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