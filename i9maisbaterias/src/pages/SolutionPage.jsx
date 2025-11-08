import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '@/config';
import { formatImageUrl } from '../utils/formatImageUrl';
import { Helmet } from 'react-helmet-async';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function SolutionPage() {
  const { slug } = useParams();
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    return <div className="container page-content"><LoadingSpinner /></div>;
  }
  if (error || !solution) {
    return <div className="container page-content"><h2>Solução não encontrada!</h2></div>;
  }

  const headerClassName = `page-header ${solution.image_style === 'contain' ? 'style-contain' : ''}`;
    const finalImageUrl = formatImageUrl(solution.image_url);

  return (
    <div className="page-container">
            <Helmet>
                <title>{solution.meta_title || solution.title}</title>
                <meta name="description" content={solution.meta_description || solution.summary} />
            </Helmet>
      <div 
       className={headerClassName} 
       style={{ backgroundImage: `url('${finalImageUrl}')` }}
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