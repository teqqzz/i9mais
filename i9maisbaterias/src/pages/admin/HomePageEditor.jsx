import React, { useState, useEffect } from 'react';
import { API_URL } from '@/config';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { formatImageUrl } from '../../utils/formatImageUrl';

export function HomePageEditor() {
    const [formData, setFormData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState('');
    
    const [newImageFile, setNewImageFile] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}/api/admin/page/home`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setFormData(data);
                setCurrentImageUrl(data.heroImageUrl);
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
        
        const dataToUpload = new FormData();
        
        for (const key in formData) {
            dataToUpload.append(key, formData[key]);
        }
        
        if (newImageFile) {
            dataToUpload.append('heroImage', newImageFile);
        } else {
            dataToUpload.append('heroImageUrl', currentImageUrl);
        }

        const res = await fetch(`${API_URL}/api/admin/page/home`, {
            method: 'PUT',
            body: dataToUpload,
            credentials: 'include'
        });
        
        if (res.ok) {
            setStatus('Salvo com sucesso!');
            if (newImageFile) {
                fetch(`${API_URL}/api/admin/page/home`, { credentials: 'include' })
                    .then(r => r.json()).then(d => setCurrentImageUrl(d.heroImageUrl));
                setNewImageFile(null);
            }
        } else {
            setStatus('Erro ao salvar.');
        }
        setTimeout(() => setStatus(''), 3000);
    };

    if (isLoading || !formData) {
        return (
            <>
                <header className="admin-header"><h1>Editar Conteúdo da Página Inicial</h1></header>
                <main className="admin-page-content"><LoadingSpinner /></main>
            </>
        );
    }

    return (
        <>
            <header className="admin-header"><h1>Editar Conteúdo da Página Inicial</h1></header>
            <main className="admin-page-content">
                <form onSubmit={handleSubmit} className="admin-form">
                    
                    <div className="admin-card">
                        <div className="admin-card-header"><h2>Seção Principal (Hero)</h2></div>
                        <div className="admin-card-body">
                            <div className="form-group"><label>Título Principal (H1)</label><input type="text" name="heroTitle" value={formData.heroTitle} onChange={handleChange} /></div>
                            <div className="form-group"><label>Subtítulo (Parágrafo)</label><textarea name="heroSubtitle" rows="3" value={formData.heroSubtitle} onChange={handleChange}></textarea></div>
                            
                            <div className="form-group" style={{marginTop: '20px'}}>
                <label>Imagem de Fundo (Hero)</label>
                <input type="file" accept="image/*" onChange={(e) => setNewImageFile(e.target.files[0])} />
                {currentImageUrl && !newImageFile && (
                  <div>
                    <p style={{marginTop: '10px'}}>Imagem Atual:</p>
                    <img src={formatImageUrl(currentImageUrl)} alt="Preview" className="image-preview" />
                  </div>
                )}
              </div>
                        </div>
                    </div>

                    {/* A SEÇÃO "NOSSA ABORDAGEM" FOI REMOVIDA DESTE FORMULÁRIO */}

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
                    {status && <p className="form-status" style={{marginTop: '15px'}}>{status}</p>}

                </form>
            </main>
        </>
    );
}