import React, { useState, useEffect } from 'react';
import { API_URL } from '@/config';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function HomePageEditor() {
    const [formData, setFormData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState('');

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}/api/admin/page/home`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setFormData(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
                setStatus('Erro ao carregar dados da página.');
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Salvando...');
        const res = await fetch(`${API_URL}/api/admin/page/home`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            credentials: 'include'
        });
        
        if (res.ok) {
            setStatus('Salvo com sucesso!');
        } else {
            setStatus('Erro ao salvar.');
        }
        setTimeout(() => setStatus(''), 3000);
    };

    if (isLoading || !formData) {
        return <div className="admin-page-content"><LoadingSpinner /></div>;
    }

    return (
        <>
            <header className="admin-header"><h1>Editar Página Inicial</h1></header>
            <main className="admin-page-content">
                <form onSubmit={handleSubmit} className="admin-form">
                    
                    <div className="admin-card">
                        <div className="admin-card-header"><h2>Seção Principal (Hero)</h2></div>
                        <div className="admin-card-body">
                            <div className="form-group"><label>Título Principal (H1)</label><input type="text" name="heroTitle" value={formData.heroTitle} onChange={handleChange} /></div>
                            <div className="form-group"><label>Subtítulo (Parágrafo)</label><textarea name="heroSubtitle" rows="3" value={formData.heroSubtitle} onChange={handleChange}></textarea></div>
                        </div>
                    </div>

                    <div className="admin-card" style={{ marginTop: '30px' }}>
                        <div className="admin-card-header"><h2>Seção "Nossa Abordagem"</h2></div>
                        <div className="admin-card-body">
                            <div className="form-grid">
                                <div className="form-group"><label>Título Bloco 1 (Economia Circular)</label><input type="text" name="approach1Title" value={formData.approach1Title} onChange={handleChange} /></div>
                                <div className="form-group"><label>Texto Bloco 1</label><textarea name="approach1Text" rows="5" value={formData.approach1Text} onChange={handleChange}></textarea></div>
                                
                                <div className="form-group"><label>Título Bloco 2 (Inovação P&D)</label><input type="text" name="approach2Title" value={formData.approach2Title} onChange={handleChange} /></div>
                                <div className="form-group"><label>Texto Bloco 2</label><textarea name="approach2Text" rows="5" value={formData.approach2Text} onChange={handleChange}></textarea></div>

                                <div className="form-group"><label>Título Bloco 3 (Inteligência de Dados)</label><input type="text" name="approach3Title" value={formData.approach3Title} onChange={handleChange} /></div>
                                <div className="form-group"><label>Texto Bloco 3</label><textarea name="approach3Text" rows="5" value={formData.approach3Text} onChange={handleChange}></textarea></div>
                            </div>
                        </div>
                    </div>

                    <div className="admin-card" style={{ marginTop: '30px' }}>
                        <div className="admin-card-header"><h2>Informações do Rodapé</h2></div>
                        <div className="admin-card-body">
                            <div className="form-grid">
                                <div className="form-group"><label>Texto "Sobre" do Rodapé</label><textarea name="footerAbout" rows="3" value={formData.footerAbout} onChange={handleChange}></textarea></div>
                                <div className="form-group"><label>E-mail de Contato (Rodapé)</label><input type="email" name="footerContactEmail" value={formData.footerContactEmail} onChange={handleChange} /></div>
                                <div className="form-group"><label>Endereço (Rodapé)</label><input type="text" name="footerContactAddress" value={formData.footerContactAddress} onChange={handleChange} /></div>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions" style={{ marginTop: '30px', borderTop: 'none', padding: 0 }}>
                        <button type="submit" className="admin-btn primary" disabled={!!status}>
                            {status ? status : 'Salvar Alterações da Página Inicial'}
                        </button>
                    </div>

                </form>
            </main>
        </>
    );
}