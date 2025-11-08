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
import { FaEye, FaEyeSlash, FaGripLines, FaLock, FaPencilAlt } from 'react-icons/fa';
import '../../admin.css';

function SortableItem({ id, item, onToggle }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const onToggleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (item.is_fixed) return;
        onToggle(item.component_key);
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} className="sortable-item">
            <button typeG="button" className="drag-handle" {...listeners} title="Reordenar">
                <FaGripLines />
            </button>
            <span className="item-title">{item.title}</span>
            
            {item.edit_path && (
                <Link to={item.edit_path} className="admin-btn small secondary" title="Editar Conteúdo">
                    <FaPencilAlt />
                </Link>
            )}

            <button 
                type="button" 
                onClick={onToggleClick} 
                className={`admin-btn small ${item.is_visible ? 'secondary' : 'danger'}`}
                disabled={item.is_fixed}
                title={item.is_fixed ? "Esta seção não pode ser ocultada" : (item.is_visible ? "Remover (Ocultar)" : "Adicionar (Mostrar)")}
            >
                {item.is_fixed ? <FaLock /> : (item.is_visible ? <FaEye /> : <FaEyeSlash />)}
            </button>
        </div>
    );
}

export function HomeLayoutEditor() {
    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const fetchLayout = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/admin/home-layout`, { credentials: 'include' });
            const data = await res.json();
            setSections(data);
        } catch {
            setStatus('Erro ao carregar o layout.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLayout();
    }, []);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setSections((items) => {
                const oldIndex = items.findIndex(item => item.component_key === active.id);
                const newIndex = items.findIndex(item => item.component_key === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleSaveOrder = async () => {
        setStatus('Salvando...');
        const order = sections.map(s => s.component_key);
        
        const res = await fetch(`${API_URL}/api/admin/home-layout/order`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order }),
            credentials: 'include'
        });

        if (res.ok) {
            setStatus('Nova ordem salva com sucesso!');
        } else {
            setStatus('Erro ao salvar a ordem.');
        }
        setTimeout(() => setStatus(''), 3000);
    };

    const handleToggle = async (key) => {
        await fetch(`${API_URL}/api/admin/home-layout/${key}/toggle`, {
            method: 'PUT',
            credentials: 'include',
        });
        fetchLayout();
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
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h2>Layout da Home</h2>
                        <button onClick={handleSaveOrder} className="admin-btn primary" disabled={!!status}>
                            {status ? status : 'Salvar Ordem'}
                        </button>
                    </div>
                    <div className="admin-card-body">
                        <p>
                            Esta é a sua Dashboard. Arraste os blocos para reordenar a página inicial.
                            <br />
                            Use os botões para "Adicionar" (<strong><FaEyeSlash /> Mostrar</strong>) ou "Remover" (<strong><FaEye /> Ocultar</strong>) uma seção.
                            <br />
                            Use o lápis (<strong><FaPencilAlt /></strong>) para editar o conteúdo de uma seção específica.
                        </p>
                        
                        <DndContext 
                            sensors={sensors} 
                            collisionDetection={closestCenter} 
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext 
                                items={sections.map(s => s.component_key)} 
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="sortable-list">
                                    {sections.map(item => (
                                        <SortableItem key={item.component_key} id={item.component_key} item={item} onToggle={handleToggle} />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </div>
                </div>
            </main>
        </>
    );
}