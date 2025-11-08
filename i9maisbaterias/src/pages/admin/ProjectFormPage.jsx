import React, { useState, useEffect} from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL } from '@/config';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; 
import { formatImageUrl } from '../../utils/formatImageUrl'; // CORREÇÃO: Importação adicionada

const formatDateForInput = (dateString) => {
  if (!dateString) return new Date().toISOString().split('T')[0]; 
  return new Date(dateString).toISOString().split('T')[0];
};

export function ProjectFormPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [imageStyle, setImageStyle] = useState('cover');
  const [publishDate, setPublishDate] = useState(formatDateForInput(null)); 
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [newImageFile, setNewImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      fetch(`${API_URL}/api/projetos/admin/${id}`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          if (data.error) throw new Error(data.error);
          setTitle(data.title);
          setSummary(data.summary);
          setContent(data.content || '');
          setImageStyle(data.image_style);
          setCurrentImageUrl(data.image_url);
          setPublishDate(formatDateForInput(data.publish_date)); 
                      setMetaTitle(data.meta_title || '');
                      setMetaDescription(data.meta_description || '');
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    formData.append('image_style', imageStyle);
    formData.append('publish_date', publishDate); 
    formData.append('meta_title', metaTitle);
    formData.append('meta_description', metaDescription);
    
    if (newImageFile) {
      formData.append('image', newImageFile);
    } else if (isEditing) {
      formData.append('image_url', currentImageUrl);
    }

    const url = isEditing ? `${API_URL}/api/projetos/${id}` : `${API_URL}/api/projetos`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, { method: method, body: formData, credentials: 'include' });
      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Falha ao salvar');
      navigate('/admin/projetos'); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) return <p>Carregando...</p>;

  return (
    <>
      <header className="admin-header">
        <h1>{isEditing ? 'Editar Projeto' : 'Criar Novo Projeto'}</h1>
      </header>
      <main className="admin-page-content">
        <div className="admin-card">
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-card-body">
              <div className="form-grid">
                
                <div className="form-group">
                  <label>Título do Projeto</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label>Data de Publicação</label>
                  <input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label>Estilo da Imagem</label>
                  <select value={imageStyle} onChange={(e) => setImageStyle(e.target.value)}>
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Resumo (Para o card)</label>
                  <textarea rows="4" value={summary} onChange={(e) => setSummary(e.target.value)}></textarea>
                </div>
                
                                <h4 className="form-subtitle" style={{gridColumn: '1 / -1'}}>Campos de SEO</h4>
                                <div className="form-group full-width">
                  <label>Meta Título (SEO)</label>
                  <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                </div>
                                <div className="form-group full-width">
                  <label>Meta Descrição (SEO)</label>
                  <textarea rows="3" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)}></textarea>
                </div>
              
                <div className="form-group full-width">
                  <label>Imagem Principal</label>
                  <input type="file" accept="image/*" onChange={(e) => setNewImageFile(e.target.files[0])} />
                  {isEditing && currentImageUrl && !newImageFile && (
                    <div>
                      <p>Imagem Atual:</p>
                      <img src={formatImageUrl(currentImageUrl)} alt="Preview" className="image-preview" />
                    </div>
                  )}
                </div>
                
                <div className="form-group full-width">
                  <label>Conteúdo Completo da Página</label>
                  <SunEditor setContents={content} onChange={setContent} height="400" />
                </div>
              </div>
              {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
            </div>
            <div className="form-actions">
              <button type="submit" className="admin-btn primary" disabled={loading}>{loading ? 'Salvando...' : 'Salvar Projeto'}</button>
              <Link to="/admin/projetos" className="admin-btn secondary">Cancelar</Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}