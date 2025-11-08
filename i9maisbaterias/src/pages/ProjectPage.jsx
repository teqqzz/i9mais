import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '@/config';
import { formatImageUrl } from '../utils/formatImageUrl';
import { Helmet } from 'react-helmet-async';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/projetos/${slug}`) 
      .then(res => {
        if (!res.ok) throw new Error('Projeto não encontrado');
        return res.json();
      })
      .then(data => {
        setProject(data);
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
  if (error || !project) {
    return <div className="container page-content"><h2>Projeto não encontrado!</h2></div>;
  }

  const headerClassName = `page-header ${project.image_style === 'contain' ? 'style-contain' : ''}`;
    const finalImageUrl = formatImageUrl(project.image_url);
  
  return (
    <div className="page-container">
            <Helmet>
                <title>{project.meta_title || project.title}</title>
                <meta name="description" content={project.meta_description || project.summary} />
            </Helmet>
      <div 
       className={headerClassName} 
       style={{ backgroundImage: `url('${finalImageUrl}')` }}
      >
        <h1>{project.title}</h1>
      </div>
      <div className="container page-content">
        <div dangerouslySetInnerHTML={{ __html: project.content }} />
        <Link to="/#projetos" className="cta-button back-button">Ver outros projetos</Link>
      </div>
    </div>
  );
}