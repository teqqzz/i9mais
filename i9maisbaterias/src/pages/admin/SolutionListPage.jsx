import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { API_URL } from '@/config';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { formatImageUrl } from '../../utils/formatImageUrl';

export function SolutionListPage() {
  const [solutions, setSolutions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

  async function fetchSolutions() {
        setIsLoading(true);
    try {  
      const response = await fetch(`${API_URL}/api/solucoes?limit=100`);
      const data = await response.json();
      setSolutions(data.posts);
    } catch (err) {
      console.error("Erro ao buscar soluções:", err);
    } finally {
            setIsLoading(false);
        }
  }

  useEffect(() => {
    fetchSolutions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta solução?')) {
      try {
        const response = await fetch(`${API_URL}/api/solucoes/${id}`, {
          method: 'DELETE',
          credentials: 'include', 
        });
        const data = await response.json();
        if (data.success) {
          setSolutions(solutions.filter(s => s.id !== id));
          alert('Solução deletada com sucesso!');
        } else {
          throw new Error(data.error || 'Falha ao deletar');
        }
      } catch (err) {
        alert(`Erro: ${err.message}`);
      }
    }
  };

  return (
    <>
      <header className="admin-header">
        <h1>Gerenciar Soluções ({isLoading ? '...' : solutions.length})</h1>
      </header>
      <main className="admin-page-content">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2>Todas as Soluções</h2>
            <Link to="/admin/solucoes/novo" className="admin-btn primary">
              <FaPlus /> Nova Solução
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
                  {solutions.map(sol => (
                    <tr key={sol.id}>
                      <td><img src={formatImageUrl(sol.image_url)} alt={sol.title} className="table-preview" /></td>
                      <td>{sol.title}</td>
                      <td>{sol.summary}</td>
                      <td>/{sol.slug}</td>
                      <td>
                        <div className="table-actions">
                          <Link to={`/admin/solucoes/editar/${sol.id}`} className="admin-btn secondary"><FaEdit /></Link>
                          <button onClick={() => handleDelete(sol.id)} className="admin-btn danger"><FaTrash /></button>
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