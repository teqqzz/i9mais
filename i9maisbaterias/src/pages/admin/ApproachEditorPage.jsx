import React, { useState, useEffect } from 'react';
import { API_URL } from '@/config';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { FaTrash, FaPlus } from 'react-icons/fa';

// Componente para o formulário de um bloco individual
function BlockForm({ block, onSave, onDelete }) {
    const [icon, setIcon] = useState(block.icon || '♻️');
    const [title, setTitle] = useState(block.title || '');
    const [text, setText] = useState(block.text || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...block, icon, title, text });
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form" style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '20px'}}>
            <div className="form-grid">
                <div className="form-group" style={{maxWidth: '100px'}}>
                    <label>Ícone (Emoji)</label>
                    <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} />
                </div>
                <div className="form-group" style={{gridColumn: 'span 2'}}>
                    <label>Título do Bloco</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group full-width">
                    <label>Texto do Bloco</label>
                    <textarea rows="4" value={text} onChange={(e) => setText(e.target.value)} required></textarea>
                </div>
            </div>
            <div className="form-actions" style={{borderTop: 'none', marginTop: '10px', padding: 0}}>
                <button type="submit" className="admin-btn primary">Salvar Bloco</button>
                {onDelete && ( // Só mostra o botão de deletar para blocos existentes
                    <button type="button" onClick={() => onDelete(block.id)} className="admin-btn danger">
                        <FaTrash /> Remover Bloco
                    </button>
                )}
            </div>
        </form>
    );
}

// Página principal do editor
export function ApproachEditorPage() {
    const [blocks, setBlocks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState('');

    const fetchBlocks = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/admin/approach-blocks`, { credentials: 'include' });
            const data = await res.json();
            setBlocks(data);
        } catch { 
            setStatus('Erro ao carregar blocos.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlocks();
    }, []);

    const showStatus = (msg) => {
        setStatus(msg);
        setTimeout(() => setStatus(''), 3000);
    };

    const handleSave = async (blockData) => {
        const { id, ...data } = blockData;
        const isNew = !id;
        const url = isNew ? `${API_URL}/api/admin/approach-blocks` : `${API_URL}/api/admin/approach-blocks/${id}`;
        const method = isNew ? 'POST' : 'PUT';

        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        showStatus('Bloco salvo com sucesso!');
        fetchBlocks(); // Recarrega a lista
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que quer remover este bloco?')) {
            await fetch(`${API_URL}/api/admin/approach-blocks/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            showStatus('Bloco removido!');
            fetchBlocks(); // Recarrega a lista
        }
    };

    return (
        <>
            <header className="admin-header"><h1>Editar Blocos "Nossa Abordagem"</h1></header>
            <main className="admin-page-content">
                {status && <div className="form-status-global success" style={{marginBottom: '20px'}}>{status}</div>}
                
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <div className="admin-card">
                            <div className="admin-card-header"><h2>Blocos Atuais</h2></div>
                            <div className="admin-card-body">
                                {blocks.map(block => (
                                    <BlockForm key={block.id} block={block} onSave={handleSave} onDelete={handleDelete} />
                                ))}
                            </div>
                        </div>

                        <div className="admin-card" style={{ marginTop: '30px' }}>
                            <div className="admin-card-header"><h2><FaPlus /> Adicionar Novo Bloco</h2></div>
                            <div className="admin-card-body">
                                <BlockForm 
                                    block={{ icon: '🆕', title: '', text: '' }} 
                                    onSave={handleSave} 
                                    onDelete={null} 
                                />
                            </div>
                        </div>
                    </>
                )}
            </main>
        </>
    );
}