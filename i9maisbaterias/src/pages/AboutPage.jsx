import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { API_URL } from '@/config';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { formatImageUrl } from '../utils/formatImageUrl';

export function AboutPage() {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/api/page/about-us`)
            .then(res => res.json())
            .then(data => {
                setContent(data.content);
                setLoading(false);
            })
            .catch(err => {
                console.error("Falha ao carregar conteúdo da página Sobre:", err);
                setLoading(false);
            });
    }, []);


    const headerImageUrl = formatImageUrl('/images/logo-i9+.png');

    return (
        <div className="page-container">
            <Helmet>
                <title>Sobre Nós | i9+ Baterias</title>
                <meta name="description" content="Conheça a história, missão e visão da i9+ Baterias, líder em inovação e economia circular no setor energético." />
            </Helmet>
            
            <div 
                className="page-header" 
                style={{ backgroundImage: `url('${headerImageUrl}')` }}
            >
                <h1>Sobre a i9+ Baterias</h1>
            </div>

            <div className="container page-content">
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                )}
            </div>
        </div>
    );
}