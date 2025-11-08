import React, { useState, useEffect } from 'react';
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
import { FaEye, FaEyeSlash, FaGripLines, FaLock } from 'react-icons/fa';
import '../../admin.css';

function SortableItem({ id, item }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleToggle = async () => {
        window.location.reload(); 
    };

    const onToggleClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (item.is_fixed) return;
        
        await fetch(`${API_URL}/api/admin/home-layout/${item.component_key}/toggle`, {
            method: 'PUT',
            credentials: 'include',
        });
        handleToggle();
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} className="sortable-item">
            <button type="button" className="drag-handle" {...listeners}>
                <FaGripLines />
            </button>
            <span className="item-title">{item.title}</span>
            <button 
                type="button" 
                onClick={onToggleClick} 
                className={`admin-btn small ${item.is_visible ? 'secondary' : 'danger'}`}
                disabled={item.is_fixed}
                title={item.is_fixed ? "Esta seção não pode ser ocultada" : (item.is_visible ? "Ocultar" : "Mostrar")}
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
        } catch { // 'err' foi removido daqui
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

    if (isLoading) {
        return (
            <>
                <header className="admin-header"><h1>Ordenar Página Inicial</h1></header>
                <main className="admin-page-content"><LoadingSpinner /></main>
            </>
        );
    }

    return (
        <>
            <header className="admin-header"><h1>Ordenar Seções da Página Inicial</h1></header>
            <main className="admin-page-content">
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h2>Arraste para reordenar</h2>
                        <button onClick={handleSaveOrder} className="admin-btn primary" disabled={!!status}>
                            {status ? status : 'Salvar Ordem'}
                        </button>
                    </div>
                    <div className="admin-card-body">
                        <p>Arraste os blocos para cima ou para baixo. Use os botões (👁️) para mostrar ou ocultar uma seção no site público.</p>
                        
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
                                        <SortableItem key={item.component_key} id={item.component_key} item={item} />
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