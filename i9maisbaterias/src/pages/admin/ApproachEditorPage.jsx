import React, { useState, useEffect } from 'react';
import { API_URL } from '@/config';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { FaTrash, FaPlus } from 'react-icons/fa'; // Importação do FaTrash corrigida
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; 

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
                    <SunEditor 
                        setContents={text} 
                        onChange={setText} 
                        height="150"
                        setOptions={{
                            buttonList: [
                                ['undo', 'redo'],
                                ['bold', 'italic', 'underline', 'strike'],
                                ['link'],
                                ['removeFormat']
                            ]
                        }}
                    />
        </div>
      </div>
      <div className="form-actions" style={{borderTop: 'none', marginTop: '10px', padding: 0}}>
        <button type="submit" className="admin-btn primary">Salvar Bloco</button>
        {onDelete && (
          <button type="button" onClick={() => onDelete(block.id)} className="admin-btn danger">
            <FaTrash /> Remover Bloco
          </button>
        )}
      </div>
    </form>
  );
}

export function ApproachEditorPage() {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');
    const [statusType, setStatusType] = useState('success');

  const fetchBlocks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/approach-blocks`, { credentials: 'include' });
            if (!res.ok) throw new Error('Falha ao buscar dados (500)');
      const data = await res.json();
            if (Array.isArray(data)) {
          setBlocks(data);
            } else {
                setBlocks([]);
                showStatus('Erro: A resposta da API não foi uma lista.', 'error');
            }
    } catch (err) {
      showStatus(`Erro ao carregar blocos: ${err.message}`, 'error');
            setBlocks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  const showStatus = (msg, type = 'success') => {
    setStatus(msg);
        setStatusType(type);
    setTimeout(() => setStatus(''), 4000);
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
    fetchBlocks();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que quer remover este bloco?')) {
      await fetch(`${API_URL}/api/admin/approach-blocks/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      showStatus('Bloco removido!');
      fetchBlocks();
    }
  };

  return (
    <>
      <header className="admin-header"><h1>Editar Blocos "Nossa Abordagem"</h1></header>
      <main className="admin-page-content">
        {status && <div className={`form-status-global ${statusType}`} style={{marginBottom: '20px'}}>{status}</div>}
        
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="admin-card">
              <div className="admin-card-header"><h2>Blocos Atuais</h2></div>
              <div className="admin-card-body">
                                {/* O .map() agora é seguro pois 'blocks' é sempre um array */}
                {blocks.map(block => (
                  <BlockForm key={block.id} block={block} onSave={handleSave} onDelete={handleDelete} />
                ))}
              </div>
            </div>

            <div className="admin-card" style={{ marginTop: '30px' }}>
Indentation-preserving replacement
              <div className="admin-card-body">
                <BlockForm 
                  block={{ icon: '🆕', title: '', text: '<p>Novo conteúdo...</p>' }} 
a                onSave={handleSave} 
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