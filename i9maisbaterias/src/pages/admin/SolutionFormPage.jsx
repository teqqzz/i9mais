import React, { useState, useEffect} from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL } from '@/config';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; 
import { formatImageUrl } from '../../utils/formatImageUrl';

export function SolutionFormPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [imageStyle, setImageStyle] = useState('cover');
  const [currentImageUrl, setCurrentImageUrl] = useState(''); 
  const [newImageFile, setNewImageFile] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);

    const [isMetaTitleLocked, setIsMetaTitleLocked] = useState(false);
    const [isMetaDescLocked, setIsMetaDescLocked] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      fetch(`${API_URL}/api/solucoes/admin/${id}`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          if (data.error) throw new Error(data.error);
          setTitle(data.title);
          setSummary(data.summary);
          setContent(data.content || '');
          setImageStyle(data.image_style);
          setCurrentImageUrl(data.image_url);
                      setPublishDate(new Date(data.publish_date || Date.now()).toISOString().split('T')[0]);
                      
                      if (data.meta_title) {
                        setMetaTitle(data.meta_title);
                        setIsMetaTitleLocked(true);
                      }
                      if (data.meta_description) {
                        setMetaDescription(data.meta_description);
                        setIsMetaDescLocked(true);
                      }
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id, isEditing]);

    useEffect(() => {
        if (!isMetaTitleLocked) {
            setMetaTitle(title.substring(0, 60));
        }
    }, [title, isMetaTitleLocked]);

    useEffect(() => {
        if (!isMetaDescLocked) {
            setMetaDescription(summary.substring(0, 160));
        }
    }, [summary, isMetaDescLocked]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    formData.append('image_style', imageStyle);
    formData.append('publish_date', publishDate);
        formData.append('meta_title', metaTitle || title.substring(0, 60));
        formData.append('meta_description', metaDescription || summary.substring(0, 160));
    
    if (newImageFile) {
      formData.append('image', newImageFile);
    } else if (isEditing) {
      formData.append('image_url', currentImageUrl);
    }

    const url = isEditing ? `${API_URL}/api/solucoes/${id}` : `${API_URL}/api/solucoes`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        body: formData,
        credentials: 'include', 
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Falha ao salvar a solução');
      navigate('/admin/solucoes');
    } catch (err) {
      setError(err.message);
e   } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) return <p>Carregando dados da solução...</p>;

  return (
    <>
      <header className="admin-header">
        <h1>{isEditing ? 'Editar Solução' : 'Criar Nova Solução'}</h1>
      </header>
      <main className="admin-page-content">
        <div className="admin-card">
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-card-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Título da Solução</label>
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
Â                </select>
                </div>
                <div className="form-group full-width">
                                    <label>Resumo (Para o card)</label>
                  <textarea rows="4" value={summary} onChange={(e) => setSummary(e.target.value)}></textarea>
                </div>
                                <h4 className="form-subtitle" style={{gridColumn: '1 / -1'}}>Campos de SEO (Otimização para Google)</h4>
                                <p style={{gridColumn: '1 / -1', fontSize: '0.9rem', color: '#555', marginTop: '-10px', marginBottom: '15px'}}>
                                    (Explicação: Estes campos definem o título e a descrição que aparecem no Google. Eles já são preenchidos automaticamente. Só altere se quiser que o texto no Google seja *diferente* do Título/Resumo principal.)
                                </p>
                                <div className="form-group full-width">
                  <label>Meta Título (SEO)</label>
                  <input 
                                        type="text" 
                                        value={metaTitle} 
                                        onChange={(e) => {
                                            setMetaTitle(e.target.value);
                                            setIsMetaTitleLocked(true);
                                        }} 
                                        placeholder="Preenchido pelo Título (max 60 chars)"
                                    />
                </div>
                                <div className="form-group full-width">
                  <label>Meta Descrição (SEO)</label>
                                    <textarea 
                                        rows="3" 
                                        value={metaDescription} 
                                        onChange={(e) => {
                                            setMetaDescription(e.target.value);
                                            setIsMetaDescLocked(true);
                                        }} 
                                        placeholder="Preenchido pelo Resumo (max 160 chars)"
                                    ></textarea>
                </div>
                <div className="form-group full-width">
                                    <label>Imagem Principal</label>
                  <input type="file" accept="image/*" onChange={(e) => setNewImageFile(e.target.files[0])} />
                  {isEditing && currentImageUrl && !newImageFile && (
                    <div>
                      <p>Imagem Atual:</p>
Â                     <img src={formatImageUrl(currentImageUrl)} alt="Preview" className="image-preview" />
                    </div>
                  )}
it             </div>
                <div className="form-group full-width">
                  <label>Conteúdo Completo da Página</label>
source
                </div>
             s </div>
              {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
            </div>
            <div className="form-actions">
all
            </div>
          </form>
        </div>
      </main>
    </>
  );
}