import React, { useState, useEffect } from 'react';
import { API_URL } from '@/config';
import { LoadingSpinner } from './LoadingSpinner';

export function UniqueApproachSection({ content }) {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Se o conteúdo (blocos) foi passado pela Home, usa ele.
    if (content && content.blocks) {
        setBlocks(content.blocks);
        setIsLoading(false);
    } else {
        // Se não (caso de uso antigo ou erro), busca na API
        setIsLoading(true);
        fetch(`${API_URL}/api/page/home/approach-blocks`)
            .then(res => {
                if (!res.ok) throw new Error('Falha ao buscar blocos');
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setBlocks(data);
                } else {
                    setBlocks([]);
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar blocos de abordagem:", err);
                setBlocks([]);
                setIsLoading(false);
            });
    }
  }, [content]);

 return (
  <section className="unique-approach-section">
   <div className="container">
    <h2 className="section-title">Nossa Abordagem Única</h2>
        {isLoading ? (
            <LoadingSpinner />
        ) : (
            <div className="approach-grid">
                {blocks.map(block => (
                    <div className="approach-item" key={block.id}>
                        <span className="icon">{block.icon}</span>
                        <h3>{block.title}</h3>
                        <p>{block.text}</p>
                    </div>
                ))}
     	</div>
        )}
 	</div>
 </section>
 );
}