import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '@/config';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaEye, FaEyeSlash, FaGripLines, FaLock, FaPencilAlt, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; 
import '../../admin.css';

function EditSectionModal({ section, onClose, onSave }) {
    const [contentData, setContentData] = useState(section.content_data);
    const [newImageFile, setNewImageFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContentData(prev => ({ ...prev, [name]: value }));
    };

    const handleSunEditorChange = (name, content) => {
        setContentData(prev => ({ ...prev, [name]: content }));
    };

    const handleApproachBlockChange = (index, field, value) => {
        const newBlocks = [...(contentData.blocks || [])];
        newBlocks[index][field] = value;
        setContentData(prev => ({ ...prev, blocks: newBlocks }));
    };

    const handleAddApproachBlock = () => {
        const newBlock = { id: Date.now(), icon: '🆕', title: 'Novo Bloco', text: '<p>Clique para editar.</p>' };
        setContentData(prev => ({ ...prev, blocks: [...(prev.blocks || []), newBlock] }));
    };

    const handleRemoveApproachBlock = (id) => {
        if (window.confirm('Tem certeza que quer remover este bloco?')) {
            setContentData(prev => ({ ...prev, blocks: prev.blocks.filter(b => b.id !== id) }));
        }
    };
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        onSave(section.id, contentData, newImageFile);
    };

    const renderFormFields = () => {
        switch(section.component_key) {
            case 'hero':
                return (
                    <>
                        <div className="form-group"><label>Título Principal</label><input type="text" name="heroTitle" value={contentData.heroTitle} onChange={handleChange} /></div>
                        <div className="form-group"><label>Subtítulo</label><textarea name="heroSubtitle" rows="3" value={contentData.heroSubtitle} onChange={handleChange}></textarea></div>
                        <div className="form-group"><label>Nova Imagem de Fundo (Opcional)</label><input type="file" accept="image/*" onChange={(e) => setNewImageFile(e.target.files[0])} /></div>
                    </>
                );
            case 'unique_approach':
                return (
                    <>
                        {(contentData.blocks || []).map((block, index) => (
                            <div key={block.id} className="admin-form" style={{border: '1px solid #ddd', padding: '15px', borderRadius: '6px', marginBottom: '15px'}}>
                                <div className="form-grid">
                                    <div className="form-group" style={{maxWidth: '100px'}}><label>Ícone</label><input type="text" value={block.icon} onChange={(e) => handleApproachBlockChange(index, 'icon', e.target.value)} /></div>
                                    <div className="form-group" style={{gridColumn: 'span 2'}}><label>Título do Bloco</label><input type="text" value={block.title} onChange={(e) => handleApproachBlockChange(index, 'title', e.target.value)} /></div>
                                    <div className="form-group full-width"><label>Texto</label>
                                        <SunEditor 
                                            setContents={block.text} 
                                            onChange={(content) => handleApproachBlockChange(index, 'text', content)} 
                                            height="150"
                                            setOptions={{ buttonList: [['undo', 'redo'], ['bold', 'italic', 'underline'], ['removeFormat']] }}
                                        />
                                    </div>
                                </div>
                                <button type="button" onClick={() => handleRemoveApproachBlock(block.id)} className="admin-btn danger small" style={{marginTop: '10px'}}><FaTrash /> Remover Bloco</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddApproachBlock} className="admin-btn secondary"><FaPlus /> Adicionar Bloco</button>
                    </>
                );
            case 'custom_text':
                return (
                    <>
                        <div className="form-group"><label>Título da Seção</label><input type="text" name="title" value={contentData.title} onChange={handleChange} /></div>
                        <div className="form-group"><label>Conteúdo</label>
                            <SunEditor 
                                setContents={contentData.content} 
                                onChange={(newContent) => handleSunEditorChange('content', newContent)}
                                height="250"
                                setOptions={{
                                    buttonList: [
                                        ['undo', 'redo'],
                                        ['font', 'fontSize', 'formatBlock'],
                                        ['bold', 'italic', 'underline', 'strike'],
                                        ['link', 'list', 'align'],
                                        ['removeFormat']
                                    ]
                                }}
                            />
                        </div>
                    </>
                );
            case 'contact':
                return (
                    <>
                        <div className="form-group"><label>Texto "Sobre" do Rodapé</label><textarea name="footerAbout" rows="3" value={contentData.footerAbout} onChange={handleChange}></textarea></div>
                        <div className="form-group"><label>E-mail de Contato (Rodapé)</label><input type="email" name="footerContactEmail" value={contentData.footerContactEmail} onChange={handleChange} /></div>
                        <div className="form-group"><label>Endereço (Rodapé)</label><input type="text" name="footerContactAddress" value={contentData.footerContactAddress} onChange={handleChange} /></div>
                    </>
                );
            default:
                return <p>O conteúdo desta seção (como Projetos, Blog, Impacto ou Calculadora) é gerenciado em outra página do admin. Use o 'lapisinho' ✏️ na lista de layout para ir até lá.</p>;
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="admin-card modal-content">
                <div className="admin-card-header">
                    <h2>Editando: {section.title}</h2>
                    <button onClick={onClose} className="admin-btn danger small"><FaTimes /></button>
                </div>
                <div className="admin-card-body">
                    <form onSubmit={handleFormSubmit}>
                        {renderFormFields()}
                        <div className="form-actions" style={{paddingTop: '20px', marginTop: '20px'}}>
                            <button type="submit" className="admin-btn primary">Salvar Alterações</button>
                            <button type="button" onClick={onClose} className="admin-btn secondary">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function SortableItem({ id, item, onToggle, onEdit, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    const onToggleClick = (e) => { e.stopPropagation(); onToggle(item.id); };
    const onEditClick = (e) => { e.stopPropagation(); onEdit(item); };
    const onDeleteClick = (e) => { e.stopPropagation(); onDelete(item.id, item.title); };

    return (
        <div ref={setNodeRef} style={style} {...attributes} className="sortable-item">
            <button type="button" className="drag-handle" {...listeners} title="Reordenar"><FaGripLines /></button>
            <span className="item-title">{item.title}</span>
            
            {item.edit_path ? (
                <Link to={item.edit_path} className="admin-btn small secondary" title="Gerenciar Itens (Projetos, Artigos, etc.)"><FaPencilAlt /></Link>
            ) : (
                <button onClick={onEditClick} className="admin-btn small secondary" title="Editar Conteúdo"><FaPencilAlt /></button>
            )}
            
            {!item.is_fixed && (
                <button type="button" onClick={onToggleClick} className={`admin-btn small ${item.is_visible ? 'secondary' : 'danger'}`} title={item.is_visible ? "Ocultar" : "Mostrar"}>
                    {item.is_visible ? <FaEye /> : <FaEyeSlash />}
                </button>
            )}
            
            {item.is_deletable && (
                <button type="button" onClick={onDeleteClick} className="admin-btn small danger" title="Remover Seção"><FaTrash /></button>
            )}
        </div>
    );
}

export function HomeLayoutEditor() {
    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [statusType, setStatusType] = useState('success');
    const [editingSection, setEditingSection] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

    const fetchLayout = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/admin/home-layout`, { credentials: 'include' });
            if (!res.ok) throw new Error('Falha ao buscar layout');
            const data = await res.json();
            setSections(data);
        } catch { 
            setStatus('Erro ao carregar o layout.');
            setStatusType('error');
        }
        finally { setIsLoading(false); }
    };

    useEffect(() => { fetchLayout(); }, []);

    const showStatus = (msg, type = 'success') => {
        setStatus(msg);
        setStatusType(type);
        setTimeout(() => setStatus(''), 4000);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setSections((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleSaveOrder = async () => {
        setStatus('Salvando ordem...');
        const order = sections.map(s => s.id);
        
        const res = await fetch(`${API_URL}/api/admin/home-layout/order`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order }),
            credentials: 'include'
        });

        if (res.ok) { 
            showStatus('Nova ordem salva com sucesso!', 'success'); 
        } else { 
            showStatus('Erro ao salvar a ordem.', 'error'); 
        }
    };

    const handleToggle = async (id) => {
        await fetch(`${API_URL}/api/admin/home-layout/toggle/${id}`, { method: 'PUT', credentials: 'include' });
        fetchLayout();
    };

    const handleDelete = async (id, title) => {
        if (window.confirm(`Tem certeza que deseja remover permanentemente a seção "${title}"?`)) {
            await fetch(`${API_URL}/api/admin/home-sections/${id}`, { method: 'DELETE', credentials: 'include' });
            showStatus('Seção removida com sucesso!', 'success');
            fetchLayout();
        }
    };

    const handleSaveSection = async (sectionId, contentData, newImageFile) => {
        const formData = new FormData();
        
        for (const key in contentData) {
            if (typeof contentData[key] === 'object' && contentData[key] !== null) {
                formData.append(key, JSON.stringify(contentData[key]));
            } else {
                formData.append(key, contentData[key]);
            }
        }

        if (newImageFile) {
            formData.append('heroImage', newImageFile);
        }

        const res = await fetch(`${API_URL}/api/admin/home-section/${sectionId}`, {
            method: 'PUT',
            body: formData,
            credentials: 'include'
        });

        if (res.ok) {
            showStatus('Conteúdo salvo com sucesso!', 'success');
            setEditingSection(null);
            fetchLayout();
        } else {
            showStatus('Erro ao salvar conteúdo.', 'error');
        }
    };
    
    const handleAddSection = async (id, contentData) => {
        const newSectionData = {
            title: contentData.title,
            content: contentData.content
        };

        const res = await fetch(`${API_URL}/api/admin/home-sections`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSectionData),
            credentials: 'include'
        });

        if (res.ok) {
            showStatus('Nova seção adicionada ao final da página!', 'success');
            setShowAddModal(false);
            fetchLayout();
        } else {
            showStatus('Erro ao adicionar seção.', 'error');
        }
    };

    if (isLoading) {
        return (
            <>
                <header className="admin-header"><h1>Página Inicial</h1></header>
                <main className="admin-page-content"><LoadingSpinner /></main>
            </>
        );
    }

    return (
        <>
            <header className="admin-header"><h1>Editor da Página Inicial</h1></header>
            <main className="admin-page-content">
                {status && <div className={`form-status-global ${statusType}`}>{status}</div>}

                <div className="admin-card">
                    <div className="admin-card-header">
                        <h2>Layout da Home</h2>
                        <button onClick={handleSaveOrder} className="admin-btn primary" disabled={status.includes('Salvando')}>
                            {status.includes('Salvando') ? status : 'Salvar Ordem'}
                        </button>
                    </div>
                    <div className="admin-card-body">
                        <p>
                            Arraste os blocos (:::) para reordenar. Use (👁️/👁️‍🗨️) para Mostrar/Ocultar, (✏️) para Editar, e (❌) para Remover.
                        </p>
                        
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
                                <div className="sortable-list">
                                    {sections.map(item => (
                                        <SortableItem 
                                            key={item.id} 
                                            id={item.id} 
                                            item={item} 
                                            onToggle={handleToggle}
                                            onEdit={setEditingSection}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                        
                        <div className="form-actions" style={{ borderTop: '1px solid var(--border-color)', marginTop: '20px' }}>
                            <button onClick={() => setShowAddModal(true)} className="admin-btn success">
                                <FaPlus /> Adicionar Nova Seção de Texto
                            </button>
                        </div>
                    </div>
                </div>

                {editingSection && (
                    <EditSectionModal 
                        section={editingSection} 
                        onClose={() => setEditingSection(null)}
                        onSave={handleSaveSection}
                    />
                )}
                
                {showAddModal && (
                    <EditSectionModal
                        section={{ 
                            component_key: 'custom_text', 
                            title: 'Nova Seção (Texto Customizado)', 
                            content_data: { title: 'Novo Título', content: '<p>Novo conteúdo...</p>' } 
                        }}
                        onClose={() => setShowAddModal(false)}
                        onSave={handleAddSection}
                    />
                )}
            </main>
        </>
    );
}