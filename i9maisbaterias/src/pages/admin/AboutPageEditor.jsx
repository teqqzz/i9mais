import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '@/config';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; 

export function AboutPageEditor() {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/api/admin/page/about-us`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setContent(data.content);
                setLoading(false);
            })
            .catch(() => { // CORREÇÃO: Removido o 'err' que não estava sendo usado
                setError('Falha ao carregar conteúdo.');
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setStatus('Salvando...');
        setError('');
        const res = await fetch(`${API_URL}/api/admin/page/about-us`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
            credentials: 'include'
        });
        
        if (res.ok) {
            setStatus('Salvo com sucesso!');
        } else {
            setStatus('Erro ao salvar.');
        }
        setTimeout(() => setStatus(''), 3000);
    };

    if (loading) {
        return <div className="admin-page-content"><p>Carregando editor...</p></div>;
    }

    return (
        <>
            <header className="admin-header">
                <h1>Editar Página "Sobre Nós"</h1>
            </header>
            <main className="admin-page-content">
                <div className="admin-card">
                    <div className="admin-card-body">
                        <p>Use o editor abaixo para alterar o conteúdo da página <Link to="/sobre" target="_blank">/sobre</Link> do site.</p>
                        
                        {error && <p className="form-status-global error">{error}</p>}

                        <div className="form-group" style={{marginTop: '20px'}}>
                            <SunEditor 
                                setContents={content} 
                                onChange={setContent} 
                                height="600" 
                            />
                        </div>
                        <div className="form-actions">
                            <button onClick={handleSave} className="admin-btn primary" disabled={!!status}>
                                {status ? status : 'Salvar Conteúdo'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}