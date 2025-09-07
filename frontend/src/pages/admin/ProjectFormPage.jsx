import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; 

const API_URL = 'http://localhost:3000';

// Formata uma data para o input type="date" (YYYY-MM-DD)
const formatDateForInput = (dateString) => {
    if (!dateString) return new Date().toISOString().split('T')[0]; 
    return new Date(dateString).toISOString().split('T')[0];
};


// Componente da Página de Formulário de Projeto (Criar/Editar)
export function ProjectFormPage() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const editorRef = useRef(null); 
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [imageStyle, setImageStyle] = useState('cover');
    const [publishDate, setPublishDate] = useState(formatDateForInput(null)); 
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [newImageFile, setNewImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [content, setContent] = useState('');


    // Buscar dados do projeto se estivermos editando
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
                })
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [id, isEditing]);

    // Função para enviar o formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const content = editorRef.current ? editorRef.current.getContent() : '';

        // Novo campo publish_date adicionado ao formData
        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        formData.append('image_style', imageStyle);
        formData.append('publish_date', publishDate); 
        
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

            alert(`Projeto ${isEditing ? 'atualizado' : 'criado'} com sucesso!`);
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
                                    <label htmlFor="title">Título do Projeto</label>
                                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="publish_date">Data de Publicação (Ordenação)</label>
                                    <input 
                                        type="date" 
                                        id="publish_date" 
                                        value={publishDate} 
                                        onChange={(e) => setPublishDate(e.target.value)} 
                                        required 
                                    />
                                </div>
                                {/* --- FIM DO NOVO CAMPO --- */}

                                <div className="form-group">
                                    <label htmlFor="image_style">Estilo da Imagem (Card/Header)</label>
                                    <select id="image_style" value={imageStyle} onChange={(e) => setImageStyle(e.target.value)}>
                                        <option value="cover">Cover (Para Fotos)</option>
                                        <option value="contain">Contain (Para Logos)</option>
                                    </select>
                                </div>

                                <div className="form-group full-width">
                                    <label htmlFor="summary">Resumo (Para o card na homepage)</label>
                                    <textarea id="summary" rows="4" value={summary} onChange={(e) => setSummary(e.target.value)}></textarea>
                                </div>
                                
                                <div className="form-group full-width">
                                    <label htmlFor="image">Imagem Principal</label>
                                    <input type="file" id="image" accept="image/png, image/jpeg, image/jpg" onChange={(e) => setNewImageFile(e.target.files[0])} />
                                    {isEditing && currentImageUrl && !newImageFile && (
                                        <div>
                                            <p>Imagem Atual:</p>
                                            <img src={`${API_URL}${currentImageUrl}`} alt="Preview" className="image-preview" />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="form-group full-width">
                                    <label>Conteúdo Completo da Página</label>
                                <SunEditor
                                    setContents={content}
                                    onChange={setContent}
                                    height="500"
                                    setDefaultStyle="font-family: inherit; font-size: 1rem;"
                                    setOptions={{
                                        buttonList: [
                                            ['undo', 'redo'],
                                            ['font', 'fontSize', 'formatBlock'],
                                            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                            ['fontColor', 'hiliteColor', 'textStyle'],
                                            ['removeFormat'],
                                            ['outdent', 'indent'],
                                            ['align', 'horizontalRule', 'list', 'lineHeight'],
                                            ['table', 'link', 'image', 'video'], // 'image' também precisa de configuração (veja aviso)
                                            ['fullScreen', 'showBlocks', 'codeView'],
                                            ['preview', 'print'],
                                        ]
                                    }}
                                />
                                </div>
                            </div>
                            {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="admin-btn primary" disabled={loading}>
                                {loading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Criar Projeto')}
                            </button>
                            <Link to="/admin/projetos" className="admin-btn secondary">Cancelar</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}