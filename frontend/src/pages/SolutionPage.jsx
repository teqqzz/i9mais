import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '@/config';


// Componente da Página de Solução
export function SolutionPage() {
    const { slug } = useParams();
    const [solution, setSolution] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Buscar a solução ao carregar o componente
    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/api/solucoes/${slug}`) 
            .then(res => {
                if (!res.ok) throw new Error('Solução não encontrada');
                return res.json();
            })
            .then(data => {
                setSolution(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return <div className="container page-content"><h2>Carregando...</h2></div>;
    }

    if (error || !solution) {
        return <div className="container page-content"><h2>Solução não encontrada!</h2></div>;
    }

    const headerClassName = `page-header ${solution.image_style === 'contain' ? 'style-contain' : ''}`;

    return (
        <div className="page-container">
            <div 
              className={headerClassName} 
              style={{ backgroundImage: `url('${solution.image_url ? `${API_URL}${solution.image_url}` : ''}')` }}
            >
                <h1>{solution.title}</h1>
            </div>
            <div className="container page-content">
                <div dangerouslySetInnerHTML={{ __html: solution.content }} />
                <Link to="/" className="cta-button back-button">Voltar para a Home</Link>
            </div>
        </div>
    );
}