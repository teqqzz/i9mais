import React, { useState, useEffect } from 'react';
import { API_URL } from '@/config';
import { LoadingSpinner } from './LoadingSpinner';

export function UniqueApproachSection() {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/api/page/home/approach-blocks`)
      .then(res => res.json())
      .then(data => {
        setBlocks(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar blocos de abordagem:", err);
        setIsLoading(false);
      });
  }, []);

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